"use client";

import { motion, MotionValue, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type ThemeMode = "day" | "night";

type TimelineItem = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
};

const TOTAL_FRAMES = 228;
const NIGHT_START_FRAME = 138;

const timeline: TimelineItem[] = [
  {
    org: "Turfingo",
    role: "Founding Product Lead",
    period: "Aug 2025 - Present",
    bullets: [
      "Led 0→1 MVP delivery for grassroots sports-tech workflows.",
      "Established Agile rituals, sprint planning and Kanban execution.",
      "Built SSoT for OKRs, KPIs, roadmaps and launch timelines.",
    ],
  },
  {
    org: "CrftHQ / Admrls",
    role: "Strategy, Product & GTM",
    period: "Jan 2025 - Present",
    bullets: [
      "Scaled ecosystem to 250+ founders and 2,000+ community members.",
      "Secured ~$15M tech credits through partnership strategy.",
      "Closed enterprise consulting deals beyond INR 15L per client.",
    ],
  },
  {
    org: "Qunova Technologies (Bizz+)",
    role: "Product Manager Intern - AI SaaS",
    period: "Sep 2024 - Sep 2025",
    bullets: [
      "Co-owned AI-first roadmap and sprint execution with the CEO.",
      "Reduced project timelines by ~20% through disciplined delivery.",
      "Contributed to matching experience gains of ~70%.",
    ],
  },
];

const FRAME_URLS: string[] = [
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203421/ezgif-frame-002_rebw8s.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203421/ezgif-frame-002_rebw8s.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203423/ezgif-frame-003_rvp2fk.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203427/ezgif-frame-004_i8rfdx.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203431/ezgif-frame-005_xq61fo.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203426/ezgif-frame-006_zyohlm.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203432/ezgif-frame-007_nmud4s.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203431/ezgif-frame-008_nylryz.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203429/ezgif-frame-009_sw8vhj.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203428/ezgif-frame-010_daqajk.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203430/ezgif-frame-011_rcjkhu.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203434/ezgif-frame-012_ieimbp.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203435/ezgif-frame-013_j6r5ta.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203436/ezgif-frame-014_iphd0p.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203436/ezgif-frame-015_mcmhty.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203435/ezgif-frame-016_pwxrc1.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203437/ezgif-frame-017_ctkcut.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203438/ezgif-frame-018_dxsfsd.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203439/ezgif-frame-019_ghxmyd.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203440/ezgif-frame-020_jcywli.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203438/ezgif-frame-021_kkbdsp.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203442/ezgif-frame-022_moqg5k.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203440/ezgif-frame-023_m8h19l.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203445/ezgif-frame-024_ayrztz.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203444/ezgif-frame-025_kspvvp.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203442/ezgif-frame-026_wfxdlm.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203446/ezgif-frame-027_favqar.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203449/ezgif-frame-028_ce9ox9.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203447/ezgif-frame-029_mc3cqf.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203454/ezgif-frame-030_vyqzcy.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203443/ezgif-frame-031_kwxg83.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203441/ezgif-frame-032_zgvrve.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203444/ezgif-frame-033_hiwe2y.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203448/ezgif-frame-034_dwaxnd.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203450/ezgif-frame-035_yjrvbo.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203449/ezgif-frame-036_olciku.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203448/ezgif-frame-037_n53yxd.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203447/ezgif-frame-038_xdk68f.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203446/ezgif-frame-039_c2wf6k.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203452/ezgif-frame-040_mkty8d.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203452/ezgif-frame-041_aim9xr.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203443/ezgif-frame-042_enen6o.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203446/ezgif-frame-043_trzjm6.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203451/ezgif-frame-044_dbfblq.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203450/ezgif-frame-045_bbi7e3.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203453/ezgif-frame-046_njzuhf.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203451/ezgif-frame-047_eox10i.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203403/ezgif-frame-048_t5gdjk.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201973/ezgif-frame-049_ql0lqm.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201974/ezgif-frame-050_fhcpiv.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201975/ezgif-frame-051_zkf1ps.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201975/ezgif-frame-052_fdzvbf.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203453/ezgif-frame-053_ncqtod.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203456/ezgif-frame-054_dovbiv.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203454/ezgif-frame-055_b5pcsg.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203456/ezgif-frame-056_wuysqv.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203455/ezgif-frame-057_fi467x.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203455/ezgif-frame-058_w20l8w.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203457/ezgif-frame-059_k5cp1f.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203457/ezgif-frame-060_brhwyx.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201976/ezgif-frame-061_pkljvj.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201977/ezgif-frame-062_hfoem0.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201978/ezgif-frame-063_cz140o.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201978/ezgif-frame-064_zda4mi.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201980/ezgif-frame-065_motrsx.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201980/ezgif-frame-066_hs3fil.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201981/ezgif-frame-067_ec9iat.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201981/ezgif-frame-068_o10yst.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201982/ezgif-frame-069_sf7yv2.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201983/ezgif-frame-070_qjc2gk.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201984/ezgif-frame-071_dhsx3l.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201985/ezgif-frame-072_cbgudk.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203470/ezgif-frame-073_hd12za.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202704/ezgif-frame-074_cvfxoy.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202697/ezgif-frame-075_hp5ztp.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202697/ezgif-frame-076_sl8ssf.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202698/ezgif-frame-077_arq7ab.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202698/ezgif-frame-078_sc32jl.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202698/ezgif-frame-079_y1llkg.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203439/ezgif-frame-080_gdvja1.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203442/ezgif-frame-081_dpt1en.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203434/ezgif-frame-082_eqslxr.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203433/ezgif-frame-083_xnuirk.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203439/ezgif-frame-084_gkyzyy.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203433/ezgif-frame-085_k3u5xj.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203437/ezgif-frame-086_jywads.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203428/ezgif-frame-087_d2m5zp.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203432/ezgif-frame-088_xd3woh.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203429/ezgif-frame-089_mzm8ie.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203427/ezgif-frame-090_zzkx0s.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203422/ezgif-frame-091_qbc1xe.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203419/ezgif-frame-092_kcokan.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203419/ezgif-frame-093_tqtkce.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203425/ezgif-frame-094_fuc9v6.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203430/ezgif-frame-095_nzflwy.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203424/ezgif-frame-096_yiynyp.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203423/ezgif-frame-097_mzthe9.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203422/ezgif-frame-098_wzxoum.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203424/ezgif-frame-099_tawtpn.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203431/ezgif-frame-100_roojtl.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203425/ezgif-frame-101_mfhvbd.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203426/ezgif-frame-102_sqbkoa.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201905/ezgif-frame-103_gdlwco.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201905/ezgif-frame-104_z2kdgx.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201905/ezgif-frame-105_pkmfta.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201905/ezgif-frame-106_dv6hea.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202698/ezgif-frame-107_j2fq5u.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203385/ezgif-frame-108_ggf3l4.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202703/ezgif-frame-109_bvwbui.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202701/ezgif-frame-110_z8ktud.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202702/ezgif-frame-111_dmdggm.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203386/ezgif-frame-112_aza45q.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203384/ezgif-frame-113_kxqfil.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203383/ezgif-frame-114_ckcetz.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203390/ezgif-frame-115_cwbz9y.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203390/ezgif-frame-116_sorymj.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203394/ezgif-frame-117_bd70hw.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203391/ezgif-frame-118_wgwrs0.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203389/ezgif-frame-119_yutbah.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203395/ezgif-frame-120_exmbto.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203386/ezgif-frame-121_lq65w0.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203387/ezgif-frame-122_q4xqa6.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203389/ezgif-frame-123_qvhdgi.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203388/ezgif-frame-124_rzkhij.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203388/ezgif-frame-125_webfrt.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203387/ezgif-frame-126_nn2liv.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202703/ezgif-frame-127_gsacz1.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202704/ezgif-frame-128_hg2yi2.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203393/ezgif-frame-129_anpmlw.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203388/ezgif-frame-130_cqobcv.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203393/ezgif-frame-131_oziooh.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203384/ezgif-frame-132_pk0sss.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202746/ezgif-frame-133_o3dhid.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203391/ezgif-frame-134_exeptg.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203384/ezgif-frame-135_xxvlzs.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202704/ezgif-frame-136_yyzayv.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202699/ezgif-frame-137_cwyqtx.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202701/ezgif-frame-138_owwyro.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203384/ezgif-frame-139_dvhdqs.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203384/ezgif-frame-140_ioqkwa.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202705/ezgif-frame-141_crvtoc.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201969/ezgif-frame-142_l1fi67.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202698/ezgif-frame-143_wubt1z.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202699/ezgif-frame-144_mu3j65.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202701/ezgif-frame-145_lfz5u0.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203384/ezgif-frame-146_j0qahs.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202700/ezgif-frame-147_e44xmp.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776202698/ezgif-frame-148_klxehs.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203392/ezgif-frame-149_huriqf.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203385/ezgif-frame-150_c1mzuw.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203396/ezgif-frame-151_kqjdaj.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203398/ezgif-frame-152_cjss13.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203395/ezgif-frame-153_wyjpsj.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203404/ezgif-frame-154_tf4nov.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203400/ezgif-frame-155_q399oa.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203399/ezgif-frame-156_tf61ax.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203392/ezgif-frame-157_yqs3sn.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203394/ezgif-frame-158_hcnjmd.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203400/ezgif-frame-159_wayar8.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203401/ezgif-frame-160_jtovnb.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203407/ezgif-frame-161_o95zje.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203399/ezgif-frame-162_brfaoi.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203396/ezgif-frame-163_jvce6x.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203401/ezgif-frame-164_qivm3y.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203405/ezgif-frame-165_oh4bj0.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203406/ezgif-frame-166_i38dgt.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203397/ezgif-frame-167_ircd1l.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203398/ezgif-frame-168_v6jt9b.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203402/ezgif-frame-169_ndsgk0.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203407/ezgif-frame-170_z96jal.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203406/ezgif-frame-171_diznck.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203398/ezgif-frame-172_m7tfqu.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203398/ezgif-frame-173_xlez9r.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203404/ezgif-frame-174_ihy69h.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203409/ezgif-frame-175_tzilks.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203410/ezgif-frame-176_yu5q1e.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203403/ezgif-frame-177_o5bpbb.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203402/ezgif-frame-178_p7gyez.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203405/ezgif-frame-179_rgs9ny.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203408/ezgif-frame-180_bg6ra0.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203409/ezgif-frame-181_smgzmm.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203408/ezgif-frame-182_fdqagj.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203408/ezgif-frame-183_dhyrcv.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203411/ezgif-frame-184_ayhcyz.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203410/ezgif-frame-185_hcwaiv.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203411/ezgif-frame-186_b5uocw.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203418/ezgif-frame-187_w5xb41.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203412/ezgif-frame-188_ly1tjm.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203418/ezgif-frame-189_bkvofa.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203420/ezgif-frame-190_nhm7xg.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203419/ezgif-frame-191_hdfba1.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776203420/ezgif-frame-192_glpdra.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201906/ezgif-frame-193_lvtyaw.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201906/ezgif-frame-194_si0u7t.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201906/ezgif-frame-195_lzspho.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201907/ezgif-frame-196_ngudeg.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201907/ezgif-frame-197_rf5biv.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201907/ezgif-frame-198_pxqua8.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201908/ezgif-frame-199_lftlj8.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201908/ezgif-frame-200_soovjk.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201908/ezgif-frame-201_kmcizt.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201909/ezgif-frame-202_rhgasj.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201909/ezgif-frame-203_kt5lee.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201910/ezgif-frame-204_bzewlb.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201910/ezgif-frame-205_ao9szh.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201911/ezgif-frame-206_chfmvj.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201911/ezgif-frame-207_hlhvsc.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201912/ezgif-frame-208_ptxxmb.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201913/ezgif-frame-209_yosead.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201913/ezgif-frame-210_ygarop.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201913/ezgif-frame-210_ygarop.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201914/ezgif-frame-212_z6tyr6.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201915/ezgif-frame-213_xamrvh.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201960/ezgif-frame-214_n8f23s.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201961/ezgif-frame-215_jivmug.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201961/ezgif-frame-216_jqmsok.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201962/ezgif-frame-217_mnptni.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201962/ezgif-frame-218_aomkdd.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201963/ezgif-frame-219_aeg13f.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201964/ezgif-frame-220_haixeb.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201964/ezgif-frame-221_r5tywu.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201965/ezgif-frame-222_xhact2.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201968/ezgif-frame-223_qgmzif.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201969/ezgif-frame-224_y60waj.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201969/ezgif-frame-225_yoov29.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201971/ezgif-frame-226_cgqz0k.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201971/ezgif-frame-227_i6owxt.png",
  "https://res.cloudinary.com/dcvp9p46e/image/upload/v1776201972/ezgif-frame-228_yk5pmz.png",
];

const toHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map((value) => Math.max(0, Math.min(255, value)).toString(16).padStart(2, "0"))
    .join("")}`;

function ProgressCard({
  progress,
  range,
  title,
  body,
  align = "left",
}: {
  progress: MotionValue<number>;
  range: [number, number];
  title: string;
  body: string;
  align?: "left" | "right";
}) {
  const opacity = useTransform(progress, [range[0], range[0] + 0.05, range[1] - 0.05, range[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[1]], [26, -26]);
  const x = align === "left" ? "10vw" : "58vw";

  return (
    <motion.article style={{ opacity, y, left: x }} className="info-card geo-card geo-card--white pointer-events-auto">
      <p className="meta-label">{title}</p>
      <p className="mt-3 text-base md:text-lg">{body}</p>
    </motion.article>
  );
}

function TimelineCard({
  item,
  progress,
  range,
}: {
  item: TimelineItem;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, [range[0], range[0] + 0.03, range[1] - 0.03, range[1]], [0, 1, 1, 0]);
  const y = useTransform(progress, [range[0], range[1]], [28, -20]);

  return (
    <motion.article style={{ opacity, y }} className="timeline-card geo-card geo-card--white">
      <p className="meta-label">{item.period}</p>
      <h3 className="mt-3 text-xl font-semibold tracking-tight">{item.role}</h3>
      <p className="mt-1 text-sm uppercase tracking-[0.12em] text-[var(--secondary)]">{item.org}</p>
      <ul className="mt-4 space-y-2 text-sm text-[var(--on-surface)]/85">
        {item.bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function ScrollyPortfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef<boolean[]>(Array(TOTAL_FRAMES).fill(false));
  const frameIndexRef = useRef(0);
  const pendingFrameRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [dayBg, setDayBg] = useState("#f8f9fa");
  const [nightBg, setNightBg] = useState("#0c0f10");
  const [loadedCount, setLoadedCount] = useState(0);
  const [loadingDone, setLoadingDone] = useState(false);
  const theme: ThemeMode = frameIndex >= NIGHT_START_FRAME ? "night" : "day";

  const allLoaded = loadedCount >= TOTAL_FRAMES;
  const loadPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  const frameUrls = FRAME_URLS;
  const progress = useMotionValue(0);

  // Mark loading done with a short delay for the exit animation
  useEffect(() => {
    if (allLoaded && !loadingDone) {
      const timer = setTimeout(() => setLoadingDone(true), 600);
      return () => clearTimeout(timer);
    }
  }, [allLoaded, loadingDone]);

  const getNearestLoadedFrame = (index: number) => {
    if (loadedFramesRef.current[index]) return index;

    for (let distance = 1; distance < TOTAL_FRAMES; distance += 1) {
      const before = index - distance;
      if (before >= 0 && loadedFramesRef.current[before]) return before;

      const after = index + distance;
      if (after < TOTAL_FRAMES && loadedFramesRef.current[after]) return after;
    }

    return -1;
  };

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    const drawableIndex = getNearestLoadedFrame(index);
    if (drawableIndex < 0) return;

    const image = imagesRef.current[drawableIndex];
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imageRatio = image.width / image.height;
    const canvasRatio = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (imageRatio > canvasRatio) {
      drawHeight = canvasHeight;
      drawWidth = drawHeight * imageRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    } else {
      drawWidth = canvasWidth;
      drawHeight = drawWidth / imageRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      drawFrame(frameIndexRef.current);
    };

    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let mounted = true;
    const collected: HTMLImageElement[] = [];
    let count = 0;

    frameUrls.forEach((url, index) => {
      const image = new Image();
      image.decoding = "async";
      image.crossOrigin = "anonymous";
      image.src = url;

      const onFrameReady = () => {
        if (!mounted) return;
        collected[index] = image;
        imagesRef.current = collected;
        loadedFramesRef.current[index] = true;
        count += 1;
        setLoadedCount(count);

        if (index === 0) {
          const sample = document.createElement("canvas");
          sample.width = 1;
          sample.height = 1;
          const sampleCtx = sample.getContext("2d");
          if (sampleCtx) {
            try {
              sampleCtx.drawImage(image, 0, 0, 1, 1);
              const [r, g, b] = sampleCtx.getImageData(0, 0, 1, 1).data;
              setDayBg(toHex(r, g, b));
            } catch {
              // Keep default background when pixel sampling is blocked.
            }
          }

          drawFrame(0);
        }

        if (index === NIGHT_START_FRAME) {
          const sample = document.createElement("canvas");
          sample.width = 1;
          sample.height = 1;
          const sampleCtx = sample.getContext("2d");
          if (sampleCtx) {
            try {
              sampleCtx.drawImage(image, 0, 0, 1, 1);
              const [r, g, b] = sampleCtx.getImageData(0, 0, 1, 1).data;
              setNightBg(toHex(r, g, b));
            } catch {
              // Keep default background when pixel sampling is blocked.
            }
          }
        }
      };

      image.onload = onFrameReady;
      image.onerror = () => {
        // On error, retry once after a short delay
        if (!mounted) return;
        const retry = new Image();
        retry.decoding = "async";
        retry.crossOrigin = "anonymous";
        retry.src = url;
        retry.onload = () => {
          collected[index] = retry;
          onFrameReady();
        };
        retry.onerror = () => {
          // Count it anyway so the loader doesn't hang forever
          if (!mounted) return;
          count += 1;
          setLoadedCount(count);
        };
      };
    });

    return () => {
      mounted = false;
    };
  }, [frameUrls]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    frameIndexRef.current = frameIndex;
    drawFrame(frameIndex);
  }, [frameIndex]);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg-day", dayBg);
    root.style.setProperty("--bg-night", nightBg);
    root.setAttribute("data-theme", theme);
  }, [dayBg, nightBg, theme]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const payload = event.data;
      if (!payload || payload.type !== "portfolio-scroll-progress") return;
      const next = Number(payload.progress);
      if (!Number.isFinite(next)) return;
      progress.set(Math.max(0, Math.min(1, next)));
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [progress]);

  useMotionValueEvent(progress, "change", (latest) => {
    pendingFrameRef.current = Math.round(latest * (TOTAL_FRAMES - 1));
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (pendingFrameRef.current === null) return;

      const nextFrame = pendingFrameRef.current;
      pendingFrameRef.current = null;
      setFrameIndex((previous) => (previous === nextFrame ? previous : nextFrame));
    });
  });

  return (
    <div data-theme={theme} className="relative overflow-x-clip">
      {/* ── Loading Screen ── */}
      {!loadingDone && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0c0f10",
            transition: "opacity 0.5s ease-out, visibility 0.5s ease-out",
            opacity: allLoaded ? 0 : 1,
            visibility: allLoaded ? "hidden" : "visible",
            pointerEvents: allLoaded ? "none" : "auto",
          }}
        >
          <p
            style={{
              fontFamily: "'Space Grotesk', 'Public Sans', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "1.5rem",
            }}
          >
            Loading Experience
          </p>

          {/* Percentage */}
          <p
            style={{
              fontFamily: "'Space Grotesk', 'Public Sans', sans-serif",
              fontSize: "4rem",
              fontWeight: 900,
              color: "#ec5b13",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              marginBottom: "1.5rem",
            }}
          >
            {loadPercent}
            <span style={{ fontSize: "1.5rem", opacity: 0.6 }}>%</span>
          </p>

          {/* Progress bar track */}
          <div
            style={{
              width: "min(80vw, 320px)",
              height: "3px",
              background: "rgba(255,255,255,0.08)",
              borderRadius: "2px",
              overflow: "hidden",
            }}
          >
            {/* Progress bar fill */}
            <div
              style={{
                width: `${loadPercent}%`,
                height: "100%",
                background: "#ec5b13",
                borderRadius: "2px",
                transition: "width 0.15s ease-out",
              }}
            />
          </div>

          <p
            style={{
              fontFamily: "'Space Grotesk', 'Public Sans', sans-serif",
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.25)",
              marginTop: "1rem",
              letterSpacing: "0.1em",
            }}
          >
            {loadedCount} / {TOTAL_FRAMES} frames
          </p>
        </div>
      )}

      <section className="relative h-screen">
        <div className="h-screen">
          <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />

          <div className="pointer-events-none relative h-full">
            <div className="mx-auto h-full max-w-7xl px-5 md:px-10">
              <motion.h2
                style={{
                  opacity: useTransform(progress, [0.02, 0.08, 0.64, 0.7], [0, 1, 1, 0]),
                  y: useTransform(progress, [0.02, 0.7], [22, -16]),
                  color: useTransform(progress, [0.22, 0.56, 0.68], ["#151512", "#151512", "#f8f6f6"]),
                }}
                className="absolute left-5 top-[10%] text-3xl font-black uppercase tracking-[-0.03em] md:left-10 md:text-6xl"
              >
                Student at day,
                <br />
                Founder at night.
              </motion.h2>

              <ProgressCard
                progress={progress}
                range={[0.2, 0.34]}
                title="CSE (AI & Robotics) • VIT Chennai"
                body="Sophomore building AI SaaS and B2B products with founder-level ownership from roadmap to GTM."
              />
              <ProgressCard
                progress={progress}
                range={[0.34, 0.48]}
                title="0→1 Product Execution"
                body="Turns business ambiguity into clear PRDs, sprint rituals and release-ready product loops."
                align="right"
              />
              <ProgressCard
                progress={progress}
                range={[0.48, 0.62]}
                title="Ecosystem Strategy"
                body="Scaled a 2,000+ member founder community with partnerships delivering ~$15M in technology credits."
              />

              <motion.section
                style={{ opacity: useTransform(progress, [0.52, 0.57, 0.82, 0.88], [0, 1, 1, 0]) }}
                className="absolute left-1/2 top-[52%] w-[min(94vw,1120px)] -translate-x-1/2 -translate-y-1/2"
              >
                <div className="grid gap-6 md:gap-8 md:grid-cols-3">
                  {timeline.map((item, index) => {
                    const span: [number, number] = [0.56 + index * 0.06, 0.92];
                    return <TimelineCard key={item.org} item={item} progress={progress} range={span} />;
                  })}
                </div>
              </motion.section>

              <motion.article
                style={{
                  opacity: useTransform(progress, [0.9, 0.95, 1, 1], [0, 1, 1, 1]),
                  y: useTransform(progress, [0.9, 1], [28, 0]),
                }}
                className="absolute bottom-10 left-1/2 w-[min(30rem,88vw)] -translate-x-1/2 geo-card geo-card--white p-5 text-center md:p-7"
              >
                <p className="meta-label">Continue</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.02em] md:text-3xl">Scroll for more</p>
              </motion.article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
