"use client";

import Image from "next/image";
import { FormEvent, startTransition, useMemo, useState } from "react";
import {
  buildAnalytics,
  buildDaromadAnalitika,
  createCandidateRecord,
  getSeededApplications,
  type ArizaInput,
  type ArizaRecord,
} from "@/lib/hr-data";

type TabKey = "shaxsiy" | "oila" | "ishDaromad" | "talim";

const tabs: Array<{ key: TabKey; label: string }> = [
  { key: "shaxsiy", label: "Shaxsga doir ma'lumotlar" },
  { key: "oila", label: "Oila a'zolari haqida ma'lumotlar" },
  { key: "ishDaromad", label: "Ish va daromad tarixi" },
  { key: "talim", label: "Ta'lim ma'lumoti haqida ma'lumotlar" },
];

function holatClass(holat: ArizaRecord["holat"]) {
  if (holat === "Tasdiqlangan") return "holat holat--yaxshi";
  if (holat === "Ko'rib chiqilmoqda") return "holat holat--jarayon";
  if (holat === "Rad etilgan") return "holat holat--rad";
  return "holat holat--yangi";
}

function formatMoney(value: number) {
  return `${new Intl.NumberFormat("uz-UZ").format(value)} so'm`;
}

export default function Home() {
  const initialApplications = useMemo(() => getSeededApplications(), []);
  const [applications, setApplications] = useState(initialApplications);
  const [selectedId, setSelectedId] = useState(initialApplications[0]?.id ?? "");
  const [activeTab, setActiveTab] = useState<TabKey>("shaxsiy");
  const [showForm, setShowForm] = useState(false);
  const [feedback, setFeedback] = useState("");
  const analytics = buildAnalytics(applications);
  const selected = applications.find((item) => item.id === selectedId) ?? applications[0];
  const daromadAnalitika = buildDaromadAnalitika(selected);

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: ArizaInput = {
      toliqIsm: String(formData.get("toliqIsm") ?? ""),
      jshshir: String(formData.get("jshshir") ?? ""),
      telefon: String(formData.get("telefon") ?? ""),
      lavozim: String(formData.get("lavozim") ?? ""),
      tajriba: String(formData.get("tajriba") ?? ""),
    };

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ArizaRecord | { error: string };
      if (!response.ok || "error" in result) {
        throw new Error("error" in result ? result.error : "So'rov yaratilmadi.");
      }

      startTransition(() => {
        setApplications((current) => [result, ...current]);
        setSelectedId(result.id);
        setActiveTab("shaxsiy");
      });
      form.reset();
      setShowForm(false);
      setFeedback("Yangi so'rov yaratildi.");
    } catch {
      const fallback = createCandidateRecord(payload);
      startTransition(() => {
        setApplications((current) => [fallback, ...current]);
        setSelectedId(fallback.id);
        setActiveTab("shaxsiy");
      });
      form.reset();
      setShowForm(false);
      setFeedback("So'rov lokal rejimda yaratildi.");
    }
  }

  return (
    <main className="page">
      <header className="page__header">
        <div>
          <h1>HR arizalar boshqaruvi</h1>
          <p>Jadvaldan arizani tanlang va ma&apos;lumotlarni bo&apos;limlar bo&apos;yicha ko&apos;ring.</p>
        </div>
        <button
          type="button"
          className="create-button"
          onClick={() => setShowForm((current) => !current)}
        >
          {showForm ? "Formani yopish" : "So'rov yaratish"}
        </button>
      </header>

      {showForm ? (
        <section className="panel form-panel">
          <div className="panel__header">
            <h2>Yangi so&apos;rov</h2>
          </div>
          <form className="request-form" onSubmit={handleCreate}>
            <div className="request-grid">
              <label>
                <span>To&apos;liq ism</span>
                <input name="toliqIsm" required />
              </label>
              <label>
                <span>JSHSHIR</span>
                <input name="jshshir" required />
              </label>
              <label>
                <span>Telefon</span>
                <input name="telefon" required />
              </label>
              <label>
                <span>Lavozim</span>
                <input name="lavozim" required />
              </label>
              <label className="request-grid__full">
                <span>Tajriba</span>
                <input name="tajriba" placeholder="Masalan: 3 yil React bilan ishlagan" required />
              </label>
              <label className="request-grid__full request-checkbox">
                <input name="rozilik" type="checkbox" required />
                <span>Shaxsga doir ma&apos;lumotlarni qayta ishlashga roziman</span>
              </label>
            </div>
            <div className="request-actions">
              <button type="submit" className="submit-button">
                Saqlash
              </button>
              {feedback ? <p className="form-feedback">{feedback}</p> : null}
            </div>
          </form>
        </section>
      ) : feedback ? (
        <p className="feedback-line">{feedback}</p>
      ) : null}

      <section className="statistika">
        <div className="statistika__item">
          <span>Jami arizalar</span>
          <strong>{analytics.jami}</strong>
        </div>
        <div className="statistika__item">
          <span>Yangi</span>
          <strong>{analytics.yangi}</strong>
        </div>
        <div className="statistika__item">
          <span>Ko&apos;rib chiqilmoqda</span>
          <strong>{analytics.koribChiqilmoqda}</strong>
        </div>
        <div className="statistika__item">
          <span>Tasdiqlangan</span>
          <strong>{analytics.tasdiqlangan}</strong>
        </div>
      </section>

      <section className="content">
        <div className="panel">
          <div className="panel__header">
            <h2>Arizalar ro&apos;yxati</h2>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>F.I.Sh</th>
                  <th>Lavozim</th>
                  <th>Sana</th>
                  <th>Holat</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((item) => (
                  <tr
                    key={item.id}
                    className={item.id === selectedId ? "is-active" : ""}
                    onClick={() => {
                      setSelectedId(item.id);
                      setActiveTab("shaxsiy");
                    }}
                  >
                    <td>{item.id}</td>
                    <td>{item.shaxsiyMalumot.toliqIsm}</td>
                    <td>{item.shaxsiyMalumot.lavozim}</td>
                    <td>{item.yuborilganSana}</td>
                    <td>
                      <span className={holatClass(item.holat)}>{item.holat}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="panel">
          <div className="panel__header panel__header--stack">
            <div>
              <h2>{selected.shaxsiyMalumot.toliqIsm}</h2>
              <p>{selected.shaxsiyMalumot.lavozim}</p>
            </div>
            <span className={holatClass(selected.holat)}>{selected.holat}</span>
          </div>

          <div className="tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                className={tab.key === activeTab ? "tab is-current" : "tab"}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "shaxsiy" && (
            <div className="person-card">
              <div className="person-card__image">
                <Image
                  src={selected.shaxsiyMalumot.rasm}
                  alt={selected.shaxsiyMalumot.toliqIsm}
                  width={220}
                  height={260}
                />
              </div>
              <div className="detail-grid">
                <div className="detail-item">
                  <span>To&apos;liq ism</span>
                  <strong>{selected.shaxsiyMalumot.toliqIsm}</strong>
                </div>
                <div className="detail-item">
                  <span>Tug&apos;ilgan sana</span>
                  <strong>{selected.shaxsiyMalumot.tugilganSana || "-"}</strong>
                </div>
                <div className="detail-item">
                  <span>Jinsi</span>
                  <strong>{selected.shaxsiyMalumot.jinsi || "-"}</strong>
                </div>
                <div className="detail-item">
                  <span>JSHSHIR</span>
                  <strong>{selected.shaxsiyMalumot.jshshir || "-"}</strong>
                </div>
                <div className="detail-item">
                  <span>Telefon</span>
                  <strong>{selected.shaxsiyMalumot.telefon}</strong>
                </div>
                <div className="detail-item">
                  <span>Lavozim</span>
                  <strong>{selected.shaxsiyMalumot.lavozim}</strong>
                </div>
                <div className="detail-item detail-item--full">
                  <span>Tajriba</span>
                  <strong>{selected.shaxsiyMalumot.tajriba}</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === "oila" && (
            <div className="list">
              {selected.oilaAzolari.length > 0 ? (
                selected.oilaAzolari.map((item, index) => (
                  <div key={`${item.ism}-${index}`} className="list-card">
                    <div className="list-card__row">
                      <span>Ism</span>
                      <strong>{item.ism}</strong>
                    </div>
                    <div className="list-card__row">
                      <span>Qarindoshlik</span>
                      <strong>{item.qarindoshlik}</strong>
                    </div>
                    <div className="list-card__row">
                      <span>Hayot statusi</span>
                      <strong>{item.holati}</strong>
                    </div>
                    <div className="list-card__row">
                      <span>Faoliyat turi</span>
                      <strong>{item.faoliyatTuri}</strong>
                    </div>
                    <div className="list-card__row">
                      <span>Tashkilot yoki muassasa</span>
                      <strong>{item.tashkilot}</strong>
                    </div>
                    <div className="list-card__row">
                      <span>Bo&apos;lim yoki sinf</span>
                      <strong>{item.bolimYokiSinf}</strong>
                    </div>
                    <div className="list-card__row">
                      <span>Lavozim yoki daraja</span>
                      <strong>{item.lavozimYokiDaraja}</strong>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty">Ma&apos;lumot kiritilmagan.</p>
              )}
            </div>
          )}

          {activeTab === "ishDaromad" && (
            <div className="experience-list">
              <div className="income-overview">
                <div className="income-stat">
                  <span>Eng baland daromad</span>
                  <strong>{formatMoney(daromadAnalitika.engBalandDaromad)}</strong>
                </div>
                <div className="income-stat">
                  <span>O&apos;rtacha daromad</span>
                  <strong>{formatMoney(daromadAnalitika.ortachaDaromad)}</strong>
                </div>
              </div>

              {selected.ishTarixi.length > 0 ? (
                selected.ishTarixi.map((item, index) => (
                  <div key={`${item.tashkilot}-${index}`} className="experience-card">
                    <div className="experience-card__header">
                      <div
                        className="experience-card__logo"
                        style={{ backgroundColor: item.logotipRangi }}
                      />
                      <div>
                        <h3>{item.tashkilot}</h3>
                        <p>
                          {item.soha} / {item.bandlikTuri}
                        </p>
                        <p>
                          {item.umumiyDavomiylik} / {item.joylashuv}
                        </p>
                      </div>
                    </div>
                    <div className="timeline-list">
                      {item.lavozimlar.map((role, roleIndex) => (
                        <div key={`${role.lavozim}-${roleIndex}`} className="timeline-role">
                          <div className="timeline-role__dot" />
                          <div className="timeline-role__content">
                            <strong>{role.lavozim}</strong>
                            <p>
                              {role.boshlangan} - {role.tugagan} / {role.davomiylik}
                            </p>
                            <p className="timeline-role__money">
                              O&apos;rtacha oylik daromad: {formatMoney(role.ortachaOylikDaromad)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {item.konikmalar ? (
                      <p className="experience-card__skills">
                        Ko&apos;nikmalar: {item.konikmalar}
                      </p>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="empty">Ma&apos;lumot kiritilmagan.</p>
              )}
            </div>
          )}

          {activeTab === "talim" && (
            <div className="list">
              <div className="list-card">
                <div className="list-card__row">
                  <span>Hozirgi daraja</span>
                  <strong>{selected.talimMalumoti.hozirgiDaraja || "-"}</strong>
                </div>
              </div>
              {selected.talimMalumoti.tarix.length > 0 ? (
                selected.talimMalumoti.tarix.map((item, index) => (
                  <div key={`${item.muassasa}-${index}`} className="list-card">
                    <div className="list-card__row">
                      <span>Ta&apos;lim turi</span>
                      <strong>{item.tur}</strong>
                    </div>
                    <div className="list-card__row">
                      <span>Muassasa</span>
                      <strong>{item.muassasa}</strong>
                    </div>
                    <div className="list-card__row">
                      <span>Yo&apos;nalish</span>
                      <strong>{item.yonalish}</strong>
                    </div>
                    <div className="list-card__row">
                      <span>Daraja</span>
                      <strong>{item.daraja}</strong>
                    </div>
                    <div className="list-card__row">
                      <span>O&apos;qish davri</span>
                      <strong>
                        {item.boshlangan} - {item.tugagan}
                      </strong>
                    </div>
                    <div className="list-card__row">
                      <span>Holati</span>
                      <strong>{item.holati}</strong>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty">Ma&apos;lumot kiritilmagan.</p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
