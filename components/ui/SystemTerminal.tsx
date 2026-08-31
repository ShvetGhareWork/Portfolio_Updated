"use client";

import React, { useState, useEffect, useRef } from "react";

export type ScenarioType = "ticketizer" | "atlas";

export interface OutputLine {
  text: string;
  type?: "normal" | "warning" | "summary" | "accent";
}

export interface ScenarioConfig {
  command: string;
  lines: OutputLine[];
}

export const SCENARIO_CONFIGS: Record<ScenarioType, ScenarioConfig> = {
  ticketizer: {
    command: "simulate_concurrent_booking --users=2 --seat=A14",
    lines: [
      { text: "[INIT] Incoming concurrent requests: User_101 & User_102 for seat A14", type: "normal" },
      { text: "[PASS 1: NAIVE] Executing un-isolated DB transactions...", type: "normal" },
      { text: "  ↳ User_101: Booking confirmed (Seat A14)", type: "normal" },
      { text: "  ↳ User_102: Booking confirmed (Seat A14)", type: "normal" },
      { text: "[ALERT] DOUBLE_BOOKING_DETECTED — Race condition allowed dual assignment!", type: "warning" },
      { text: "[PASS 2: REDIS LUA] Acquiring atomic lock via Redis Lua script...", type: "normal" },
      { text: "  ↳ Lock key: lock:seat:A14 | TTL: 5000ms", type: "accent" },
      { text: "  ↳ User_101: Lock acquired → Booking confirmed (Seat A14)", type: "normal" },
      { text: "  ↳ User_102: PENDING → Lock acquisition failed → REJECTED (409 Conflict)", type: "normal" },
      { text: "[SUMMARY] Atomicity is enforced via a Lua script executed inside Redis, not application-level locking.", type: "summary" },
    ],
  },
  atlas: {
    command: "inject_failure --step=payment_processing",
    lines: [
      { text: "[INIT] Initiating SAGA transaction for Order #8942...", type: "normal" },
      { text: "[FLOW] ORDER_PLACED → Event published: OrderCreatedEvent", type: "normal" },
      { text: "[FLOW] INVENTORY_RESERVED → Event published: InventoryReservedEvent", type: "normal" },
      { text: "[FLOW] PAYMENT_PROCESSING → Attempting charge...", type: "normal" },
      { text: "[FAIL] PAYMENT_PROCESSING → FAILED (Gateway Timeout 504)", type: "warning" },
      { text: "[RECOVERY] PaymentFailedEvent broadcast. Triggering compensating transactions...", type: "accent" },
      { text: "  ↳ INVENTORY_RESERVED → COMPENSATING (release inventory reserved for Order #8942)", type: "normal" },
      { text: "  ↳ ORDER_PLACED → COMPENSATING (cancel order & send notification)", type: "normal" },
      { text: "[SUMMARY] Atlas uses SAGA choreography, so each service listens for failure events and independently triggers its own compensating action, rather than a central orchestrator managing rollback.", type: "summary" },
    ],
  },
};

interface SystemTerminalProps {
  scenario: ScenarioType;
}

export default function SystemTerminal({ scenario }: SystemTerminalProps) {
  const config = SCENARIO_CONFIGS[scenario];
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const outputEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRunning) return;
    if (visibleCount >= config.lines.length) {
      // Defer state transition outside synchronous effect execution
      const timer = setTimeout(() => setIsRunning(false), 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, 200); // 200ms delay per line (within 150-250ms range)

    return () => clearTimeout(timer);
  }, [isRunning, visibleCount, config.lines.length]);

  useEffect(() => {
    if (visibleCount > 0) {
      outputEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [visibleCount]);

  const handleRun = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRunning) return;
    if (visibleCount >= config.lines.length) {
      setVisibleCount(0);
    }
    setIsRunning(true);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsRunning(false);
    setVisibleCount(0);
  };

  return (
    <div
      className="my-4 w-full bg-black border border-[#BFFF00] rounded-none p-3 font-mono text-xs text-[#BFFF00] flex flex-col justify-between select-text"
      style={{ minHeight: "220px", maxHeight: "280px" }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* Terminal Content Region */}
      <div
        className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-[#BFFF00]/30"
        aria-live="polite"
        aria-atomic="false"
      >
        {/* Pre-filled prompt & command line */}
        <div className="flex items-center gap-2 flex-wrap text-[#BFFF00]">
          <span className="text-[#BFFF00] font-bold select-none">&gt;$</span>
          <span className="font-mono text-[11px] sm:text-xs tracking-wide">{config.command}</span>
          {!isRunning && visibleCount === 0 && (
            <span className="inline-block w-2 h-4 bg-[#BFFF00] animate-pulse select-none" />
          )}
        </div>

        {/* Animated Output Lines */}
        {config.lines.slice(0, visibleCount).map((line, idx) => {
          let colorClass = "text-[#BFFF00]";
          if (line.type === "warning") {
            colorClass = "text-red-400 font-bold";
          } else if (line.type === "summary") {
            colorClass = "text-emerald-300 font-semibold border-t border-[#BFFF00]/20 pt-1 mt-1";
          } else if (line.type === "accent") {
            colorClass = "text-yellow-300";
          }

          return (
            <div key={idx} className={`text-[10px] sm:text-[11px] leading-relaxed ${colorClass}`}>
              {line.text}
            </div>
          );
        })}

        {/* Blinking cursor while running */}
        {isRunning && (
          <div className="flex items-center gap-1">
            <span className="inline-block w-2 h-4 bg-[#BFFF00] animate-pulse select-none" />
          </div>
        )}
        <div ref={outputEndRef} />
      </div>

      {/* Button Bar */}
      <div className="pt-2 mt-2 border-t border-[#BFFF00]/30 flex items-center gap-3">
        <button
          type="button"
          onClick={handleRun}
          disabled={isRunning}
          className="bg-[#BFFF00] text-black font-mono font-black text-[9px] tracking-[0.15em] px-3.5 py-1.5 uppercase transition-all hover:translate-x-[1px] hover:-translate-y-[1px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
        >
          {isRunning ? "RUNNING..." : "RUN"}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="border border-[#BFFF00] bg-transparent text-[#BFFF00] font-mono font-black text-[9px] tracking-[0.15em] px-3.5 py-1.5 uppercase transition-all hover:bg-[#BFFF00]/10"
        >
          RESET
        </button>
      </div>
    </div>
  );
}
