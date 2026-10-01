---
title: "Find Large Files with PowerShell"
date: 2026-10-01
tags: [powershell, filesystem]
description: A short pipeline that finds files over a size threshold and lists the biggest ones first.
script_url: https://github.com/Snowstuff123/powershell-scripts/blob/main/Find-LargeFiles.ps1
---
When a disk fills up, the fastest fix is usually finding the few files taking most of the space. This script walks a path, filters by size, and shows the largest files first.

## The script

```powershell
param(
    [string]$Path = 'C:\',
    [int]$MinSizeMB = 100,
    [int]$Top = 25
)

# Walk the path, keep files over the threshold, biggest first
Get-ChildItem -Path $Path -Recurse -File -ErrorAction SilentlyContinue |
    Where-Object { $_.Length -gt ($MinSizeMB * 1MB) } |
    Sort-Object Length -Descending |
    Select-Object -First $Top FullName,
        @{ Name = 'SizeMB'; Expression = { [math]::Round($_.Length / 1MB, 1) } }
```

## Parameters

| Parameter | Default | What it does |
|-----------|---------|--------------|
| `-Path` | `C:\` | Where to start searching |
| `-MinSizeMB` | `100` | Ignore files smaller than this |
| `-Top` | `25` | How many results to return |

## Example

Find the ten largest files over 500 MB on the D: drive:

```powershell
.\Find-LargeFiles.ps1 -Path D:\ -MinSizeMB 500 -Top 10
```

## Notes

- `-ErrorAction SilentlyContinue` hides "access denied" errors on protected folders. Run PowerShell as administrator if you need those folders included.
- Scanning a whole drive can take a while. Point `-Path` at a specific folder when you can.
- `1MB` is a built-in PowerShell constant, so `$MinSizeMB * 1MB` converts megabytes to bytes without any math on your part.
