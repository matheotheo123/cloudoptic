# CloudOptic Website --- Product Requirements Document (PRD)

## Overview

CloudOptic is a website for a FinOps consulting
brokerage that connects companies with elite cloud cost optimization
experts.

Primary services: - AI infrastructure cost optimization - Cloud cost
reduction audits - Kubernetes cost optimization

The website's purpose is to convert companies experiencing cloud cost
pain into booked consultation calls.

------------------------------------------------------------------------

# Design Philosophy

Inspired by: - Stripe - Mercor - Linear

Design principles: - extremely clean - minimal cognitive load - light
theme only - professional but modern - fast animations - glassmorphism
surfaces

------------------------------------------------------------------------

# Color Palette

Primary #4DA3FF

Secondary #E8F3FF

Background #FFFFFF

Glass surfaces rgba(255,255,255,0.6) backdrop-blur: 12px

Accent #2F80ED

------------------------------------------------------------------------

# Typography

Primary font Inter

Fallback system-ui

Sizes Hero: 48px Body: 18px

------------------------------------------------------------------------

# Layout Structure

Single page layout

Sections:

1.  Hero
2.  Problem
3.  Solutions
4.  How It Works
5.  Case Examples
6.  Call To Action
7.  Footer

------------------------------------------------------------------------

# Hero Section

Headline Cut Your AI & Cloud Costs by 30%

Subtext We connect companies with elite FinOps engineers who reduce
infrastructure spend without sacrificing performance.

Primary CTA Get Cost Audit

Secondary CTA Talk to an Expert

Hero visual: Animated glass panel showing decreasing cloud bill and
increasing savings.

------------------------------------------------------------------------

# Problem Section

Cards describing common problems:

1.  AI GPU waste
2.  runaway cloud bills
3.  inefficient infrastructure

Cards use glassmorphism styling.

Hover animation scale 1.02 with soft shadow.

------------------------------------------------------------------------

# Solutions Section

Core services:

### AI Infrastructure Optimization

Reduce GPU costs and model serving expenses.

### Cloud Cost Reduction

Audit and optimize AWS, GCP, and Azure spending.

### Kubernetes Optimization

Improve cluster efficiency and reduce compute waste.

Each card includes: - icon - description - CTA button

------------------------------------------------------------------------

# How It Works

Three step process:

1.  Free infrastructure review
2.  Expert optimization plan
3.  Immediate cost reduction

Animated timeline triggered on scroll.

------------------------------------------------------------------------

# Case Example Section

Example:

AI Startup Monthly cloud bill: \$120k Optimized to: \$68k Savings: 43%

Numbers animate upward when visible on scroll.

------------------------------------------------------------------------

# CTA Section

Headline Stop Overpaying for Cloud Infrastructure

Button Book Free Audit

Large centered glassmorphism panel.

------------------------------------------------------------------------

# Animation Requirements

Use Framer Motion.

Animations:

Button hover scale 1.05 with glow

Scroll animations fade up

Page transitions smooth opacity transitions

Animations must remain extremely fast and smooth.

------------------------------------------------------------------------

# Technology Stack

Frontend Next.js 14 TypeScript TailwindCSS Framer Motion

Hosting Vercel

Forms Next.js server actions

------------------------------------------------------------------------

# Security Requirements

Critical rules:

Never expose API keys in frontend.

All APIs must run through Next.js server functions.

Secrets stored in environment variables in .env.local.

Never commit secrets to repository.

------------------------------------------------------------------------

# Rate Limiting

Use Upstash Redis for rate limiting.

Example rule 10 requests per minute per IP.

------------------------------------------------------------------------

# Bot Protection

Use Cloudflare Turnstile on all forms.

------------------------------------------------------------------------

# Backend Isolation

If AI APIs are used later, create:

/api/ai-proxy

Responsibilities: - authenticate user - enforce rate limits - call AI
APIs server-side

Never call AI APIs directly from frontend.

------------------------------------------------------------------------

# Data Storage

Use Supabase Postgres.

Table: leads

Fields: name email company cloud_spend message created_at

------------------------------------------------------------------------

# Supabase Security

Row Level Security enabled.

Writes only through server functions.

Never expose service role key.

Public anon key used only for authentication.

------------------------------------------------------------------------

# MCP Tools for Claude Code

Connect Claude Code to:

GitHub MCP Allows repository creation and commits.

Vercel MCP Allows deployments and preview environments.

Supabase MCP Allows schema creation and migrations.

Playwright MCP Allows automated UI testing and flow verification.

Brave Search MCP Allows real-time research and competitor analysis.

------------------------------------------------------------------------

# Performance Requirements

Target Lighthouse scores:

Performance: 95+ Accessibility: 95+ SEO: 95+

Optimization requirements: lazy loading optimized images minimal JS
bundle

------------------------------------------------------------------------

# Future Features

Prepare architecture for:

-   AI cloud bill analyzer
-   automated FinOps dashboards
-   cost optimization recommendation engine

These features are not implemented yet but the architecture must allow
them later.

------------------------------------------------------------------------

# Conversion Optimization

Psychology rules:

minimal decision making clear CTA short copy strong pain framing trust
signals

------------------------------------------------------------------------

# Deliverables

Claude Code should generate:

1.  full Next.js project
2.  responsive layout
3.  production ready deployment
4.  security best practices
5.  smooth animations

------------------------------------------------------------------------

End of PRD
