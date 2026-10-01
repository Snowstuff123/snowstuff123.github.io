---
layout: post
title: "Microsoft Exchange: Mailboxes forwarding to Specified email."
date: 2026-10-01
tags: [powershell, exchange]
---

Get a list of all Mailboxes forwarding to a specified mailbox

```PowerShell
RecipientCN = (Get-Recipient johndoe).Identity
Get-Mailbox -ResultSize:Unlimited -Filter:{ForwardingAddress -ne $null} | Where-Object {$_.ForwardingAddress -eq $RecipientCN}
```

[Download the full script](https://github.com/yourusername/powershell-scripts/blob/main/Find-LargeFiles.ps1)
