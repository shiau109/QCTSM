# app/routers/dr.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import toml, requests, datetime

router = APIRouter()

# load once at startup
_config = toml.load(r"app/config.toml")
DR_LIST = _config.get("DR", [])
DR_MAP  = { d["name"]: d for d in DR_LIST }

# global default window (in minutes)
DEFAULT_WINDOW = _config.get("Settings", {}) \
                       .get("history_length_minutes", 10)


@router.get("/info")
def get_full_device_config():
    # unchanged
    return DR_LIST


@router.get("/status")
def get_status():
    # unchanged
    return {
        "DR3": {"led_color": "bg-yellow-500", "status_text": "Testing"},
        "DR4": {"led_color": "bg-yellow-500", "status_text": "Testing"},
    }


class HistoryRequest(BaseModel):
    dr_name:   str
    channel_nr: int
    fields:    List[str]


@router.post("/temperature-history")
def temperature_history(req: HistoryRequest):
    # look up DR
    dr = DR_MAP.get(req.dr_name)
    if not dr:
        raise HTTPException(404, f"DR '{req.dr_name}' not found")

    # choose window: per-DR override or global default
    window = dr.get("history_length_minutes", DEFAULT_WINDOW)

    # compute times
    now   = datetime.datetime.now()
    start = now - datetime.timedelta(minutes=window)
    fmt   = "%Y-%m-%d %H:%M"
    payload = {
        "channel_nr": req.channel_nr,
        "start_time": start.strftime(fmt),
        "stop_time":  now.strftime(fmt),
        "fields":     req.fields,
    }

    # find device IP
    controller = dr.get("temperature_controller")
    if not controller or controller.get("type") != "BFTC":
        raise HTTPException(400, "No BFTC controller configured")

    bftc = controller
    if not bftc.get("ip_web"):
        raise HTTPException(400, "No BFTC ip_web configured")


    url  = f"http://{bftc['ip_api']}/channel/historical-data"
    resp = requests.post(url, json=payload, timeout=100)
    resp.raise_for_status()
    return resp.json()

import paramiko
import os
@router.get("/list-log-folders/{dr_name}")
def list_log_folders(dr_name: str):
    dr = DR_MAP.get(dr_name)
    if not dr:
        raise HTTPException(404, f"DR '{dr_name}' not found")

    cu = dr.get("control_unit", {})
    ssh_info = cu.get("SSHserver", {})
    remote_ip = cu.get("ip")
    remote_path = cu.get("log_path")

    if not (remote_ip and remote_path and ssh_info.get("account") and ssh_info.get("password")):
        raise HTTPException(400, "Missing SSH credentials or log path")

    # Convert Windows-style path to Linux-style for remote access
    remote_path = remote_path.replace("\\", "/")

    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(remote_ip, username=ssh_info["account"], password=ssh_info["password"])
        sftp = ssh.open_sftp()
        folders = sftp.listdir(remote_path)


        ssh.close()
        return folders

    except Exception as e:
        raise HTTPException(500, f"SSH error: {str(e)}")
