"use client";

import { useState } from "react";
import { shuffle } from "../utils";
import SetupScreen from "../components/screen/setup";
import CampaignScreen from "../components/screen/campign";
import PolicyScreen from "../components/screen/policy";
import BallotScreen from "../components/screen/ballot";
import CountingScreen from "../components/screen/counting";
import DistrictResultScreen from "../components/screen/district_result";
import NationalResultScreen from "../components/screen/national_result";
import {
  PROBLEMS,
  VOTER_TYPES,
  OPPONENT_NAMES,
  PARTIES,
} from "../data/narrators";

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 3 — POLICY WRITING (3 rounds)
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 4 — BALLOT
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 5 — COUNTING (policy-weighted)
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 6 — DISTRICT RESULT
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// SCREEN 7 — NATIONAL RESULTS
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("setup");
  const [setup, setSetup] = useState(null);
  const [gameData] = useState(() => ({
    problems: shuffle(PROBLEMS).slice(0, 3),
    voters: shuffle(VOTER_TYPES).slice(0, 5),
    opponents: shuffle(OPPONENT_NAMES)
      .slice(0, 3)
      .map((n, i) => ({ name: n, party: PARTIES[(i + 1) % PARTIES.length] })),
    issues: shuffle([
      "road connectivity",
      "power supply",
      "youth employment",
      "school quality",
      "hospital access",
      "corruption",
      "flood control",
      "drinking water",
    ]).slice(0, 2),
  }));
  const [policyResults, setPolicyResults] = useState([]);
  const [districtResult, setDistrictResult] = useState(null);
  const [allResults, setAllResults] = useState(null);

  const { problems, voters, opponents, issues } = gameData;

  if (screen === "setup")
    return (
      <SetupScreen
        onStart={(s) => {
          setSetup(s);
          setScreen("campaign");
        }}
      />
    );
  if (screen === "campaign")
    return (
      <CampaignScreen
        setup={setup}
        opponents={opponents}
        issues={issues}
        onContinue={() => setScreen("policy")}
      />
    );
  if (screen === "policy")
    return (
      <PolicyScreen
        setup={setup}
        problems={problems}
        voters={voters}
        onComplete={(r) => {
          setPolicyResults(r);
          setScreen("ballot");
        }}
      />
    );
  if (screen === "ballot")
    return (
      <BallotScreen
        setup={setup}
        opponents={opponents}
        onVote={() => setScreen("counting")}
      />
    );
  if (screen === "counting")
    return (
      <CountingScreen
        setup={setup}
        opponents={opponents}
        policyResults={policyResults}
        onResult={(r, a) => {
          setDistrictResult(r);
          setAllResults(a);
          setScreen("district-result");
        }}
      />
    );
  if (screen === "district-result")
    return (
      <DistrictResultScreen
        setup={setup}
        result={districtResult}
        allResults={allResults}
        policyResults={policyResults}
        onContinue={() => setScreen("national")}
      />
    );
  if (screen === "national")
    return (
      <NationalResultScreen
        setup={setup}
        playerWon={allResults?.[0]?.isSelf ?? false}
        policyResults={policyResults}
      />
    );
  return null;
}
