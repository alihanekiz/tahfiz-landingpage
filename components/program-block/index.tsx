"use client";
import "./index.scss";
import { motion } from "framer-motion";
import BorderPattern from "@/public/branding/border-pattern.svg";

const programItems = [
  { title: "Tilavet ve Ilahiler", time: "19:00-19:45" },
  { title: "Hafızlaridan kısa sureler", time: "19:45-20:15" },
  { title: "Sohbet", time: "20:15-20:35" },
  { title: "Hediye takdimi", time: "20:35-21:00" }
];

const ProgramItem = ({ title, time }: { title: string; time: string }) => (
  <div className="w-100 d-flex justify-content-between pb-2">
    <div className="fw-bold">{title}</div>
    <div className="time">{time}</div>
  </div>
);

export default function ProgramBlock() {
  return (
    <motion.div
      key={1}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="program-block py-3 py-lg-5"
      id="program"
    >
      <div className="container">
        <BorderPattern />
        <div className="row py-4 px-3">
          <div className="col-12 col-lg-6 d-flex flex-column">
            <h2 className="text-primary fw-bold">Program</h2>
            <p>Programımız ücretsizdir ve 2 saat sürecektir.</p>
          </div>
          <div className="col-12 col-lg-6 py-4 py-lg-0">
            {programItems.map((item, index) => (
              <ProgramItem key={index} title={item.title} time={item.time} />
            ))}
          </div>
        </div>
        <BorderPattern />
      </div>
    </motion.div>
  );
}