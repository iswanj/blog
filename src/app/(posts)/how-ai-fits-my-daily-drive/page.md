export const metadata = {
  title: "How I Use AI in My Daily Drive (Without Losing the Plot)",
  date: "2026-10-21",
  description:
    "How I use AI alongside Jira stories, acceptance criteria, and code reviews to ship faster without losing engineering rigor.",
};

I’ve been leaning on AI a lot more in my day-to-day work lately—not to think for me, but more like a teammate sitting beside me who holds context and helps me move faster when things get messy.

At first, I treated it like a party trick: ask a quick question, grab the answer, and move on. That worked fine for isolated snippets, but it fell apart the moment the work got real—stories with strict acceptance criteria, subtle edge cases, and reviews where one overlooked detail can slip straight into production.

So I changed how I use it.

## Start with the story, not the prompt

One of the biggest upgrades for me was bringing Jira context directly into my AI workflow.

Before I write any code, I pull in the full story—the description, comments, and especially the acceptance criteria. That way I’m not building from memory or piecing things together from a half-remembered Slack thread. I’m building against what the ticket actually asks for.

It sounds simple, but it saves me from a surprisingly common mistake: shipping something that technically "works," only to realize one acceptance criterion was missed.

Now my flow looks like this:

1. Open the Jira story
2. Feed the full context into the session
3. Break the work down against the acceptance criteria
4. Keep those criteria front and center while building

I still decide the architecture and approach. AI just keeps me honest to the requirements.

## Use it while building, not only when stuck

During implementation, I bounce questions off AI the same way I’d tap a teammate on the shoulder:

- "Does this cover all the acceptance criteria?"
- "What edge cases am I missing here?"
- "Can we simplify this without changing the behavior?"

Half the time, the real value isn’t getting ready-made code—it’s catching something I almost overlooked, like an empty state, an error path, or a validation rule tucked away in the ticket.

That alone has made my day-to-day work far less reactive, with fewer "oh wait" moments right before opening a merge request.

## Bring the same mindset into code review

I also use AI when reviewing other people’s code—not to rubber-stamp MRs or replace my own judgment, just to help spot gaps faster.

When I review a change, I try to look beyond *"does this code look clean?"* and check:

- Did we miss an acceptance criterion from the story?
- Is there an edge case the implementation doesn’t handle?
- Did we forget loading, error, or empty states?
- Does the actual behavior match what the ticket promised?

AI is great here because it can hold the Jira story and the code diff in mind at the same time. It helps catch the kind of small gaps that otherwise turn into follow-up tickets later. Still, the final call is always mine—if I can’t explain why a change is safe, I don’t approve it.

## What I keep reminding myself

A few guardrails that keep this workflow useful instead of noisy:

- **Context beats clever prompts.** Vague questions get vague answers.
- **Speed doesn’t replace judgment.** AI moves fast, but engineering trade-offs are still mine to make.
- **If it doesn’t match the AC, it’s not done.**
- **Reviews are still about people.** AI can highlight a gap, but the conversation with your teammate is what actually improves the code.

## The real win

For me, AI-assisted engineering isn’t about churning out more lines of code. It’s about missing less:

- Fewer missed requirements from Jira
- Fewer skipped edge cases while building
- Fewer blind spots during code review

That translates into cleaner merge requests, fewer surprises in QA, and more time for the decisions that actually need a human.

If you’ve started weaving AI into your daily workflow too, I’d love to hear what’s working for you—especially around tickets, acceptance criteria, and code reviews.
