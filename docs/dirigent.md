# Dirigent runbook (for you, the designer)

## Every Builder task (Account B, Claude Code)
1. In Claude Code type: `Do docs/prompts/B-0X-....md` (Studio tells you which X).
2. Wait for the "REPORT FOR STUDIO" block → paste it into the Studio chat.
3. `/clear`. Next task.

## Every Studio drop (Account A)
1. Download the zip → unzip into `D:\Claude_Dev\raisetalks` → "Replace all".
2. Tell Builder the one line Studio gives you.

## Order (today)
| Step | You | Builder (B) | Studio (A) |
|---|---|---|---|
| 1 | Unzip Drop 0 into an empty folder | B-01 setup | — |
| 2 | Unzip Drop 2 on top (Replace all) | B-02 images → B-03 forms mock | — |
| 3 | — | B-04 QA archive → zip to Studio | QA round → fix drop |
| 4 | Repeat fix rounds | B-04 after each | Final polish |

Visual notes: batch them, send once per phase.
Model tip: Sonnet for B-01…B-04.
