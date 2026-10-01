---
layout: post
title: "Microsoft Exchange: Mailboxes forwarding to Specified email."
date: 2026-10-01
description: "Use this when you need to a list of all mailboxes forwarding to a specified mailbox."
tags: [powershell, exchange, snippet]
---
## Overview
Use this when you need to a list of all mailboxes forwarding to a specified mailbox.

Simple, yet effective.

## The Snippet

```powershell
RecipientCN = (Get-Recipient johndoe).Identity
Get-Mailbox -ResultSize:Unlimited -Filter:{ForwardingAddress -ne $null} | Where-Object {$_.ForwardingAddress -eq $RecipientCN}
```

### Export results to a CSV

```powershell
RecipientCN = (Get-Recipient johndoe).Identity
Get-Mailbox -ResultSize:Unlimited -Filter:{ForwardingAddress -ne $null} | Where-Object {$_.ForwardingAddress -eq $RecipientCN} | Export-Csv -Path:"C:\temp\mailboxForwards.csv" -NoTypeInformation
```

Credit to [Grant on StackOverflow](https://stackoverflow.com/users/1733386/grant) for this.
Huge thanks to Grant & mjolinor for answering [pr0digy's question over on Stack Overflow](https://stackoverflow.com/questions/21915808/list-all-mailboxes-that-forward-to-a-specific-user).
