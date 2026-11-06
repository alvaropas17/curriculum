# Agent History Search

Recovers useful information from past conversations with coding agents. Tell your agent what was in an earlier answer and it searches your history, then answers with the exact source so you can check it.

- Agents: Claude Code, Codex, OpenCode, Pi, omp (Oh My Pi) and Pi Pocket
- Access: local and read-only. No accounts, pip packages or network access
- MCP: optional server, with structured arguments. Other agents use the CLI
- Requirements: Windows 10 or 11, Python 3.10+ with `sqlite3`
- Price and license: free, MIT
- Repository: https://github.com/alvaropas17/agent-history-search
- Page for people: https://alvaropastor.dev/herramientas/agent-history-search

The repository README and `docs/SETUP-PROMPT.md` are the source of truth for setup.

## Limits

- Tested on Windows only.
- Reads another agent's history only on explicit request, and never switches source after an error or an empty result.
- Reports gaps in `incomplete` and `notes`. An incomplete empty result is not proof of absence.

## Setup prompt

The user fills in the bracketed values and pastes this into their agent. Setup reads private history and edits agent configuration, so it needs the user's approval.

```text
Set up Agent History Search on this computer.
Repository: https://github.com/alvaropas17/agent-history-search
Package folder: [ABSOLUTE PATH]
Agent I will use: [codex / claude / opencode / pi / omp / pocket]
Histories I authorize you to read: [SOURCES AND PATHS]

Read the README and setup documentation in the downloaded version.
Check Python 3.10+, sqlite3, CLI help and the offline tests.
For Codex or Claude Code, configure the included history_mcp.py MCP server
with a fixed host and only authorized stores. For other agents, configure
the history_search.py helper and its skill or local instructions.
Before editing config, show the proposed changes and create a backup.
Do not replace entire config files or change unrelated MCP servers.
Ask me for missing paths or permissions. Do not switch sources after
errors or empty results. Do not modify histories or delete WAL files.
Verify the actual connection with a minimal authorized read, and explain
how to check it in a new session. Report any checks still pending.
```
