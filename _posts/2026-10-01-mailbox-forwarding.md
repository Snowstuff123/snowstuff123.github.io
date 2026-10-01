---
layout: post
title: "Microsoft Exchange: Mailboxes forwarding to Specified email."
date: 2026-10-01
description: A short pipeline that finds files over a size threshold and lists the biggest ones first.
tags: [powershell, exchange, snippet]
---
## Overview
Use this when you need to a list of all mailboxes forwarding to a specified mailbox.

## The script

```PowerShell
RecipientCN = (Get-Recipient johndoe).Identity
Get-Mailbox -ResultSize:Unlimited -Filter:{ForwardingAddress -ne $null} | Where-Object {$_.ForwardingAddress -eq $RecipientCN}
```
