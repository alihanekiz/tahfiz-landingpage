"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import "./index.scss";

export default function ParkingInfo() {
  // State to track whether overlay is open
  const [showOverlay, setShowOverlay] = useState(false);

  // Example images to display in overlay
  const images = [
    "/images/plan1.jpeg",
    "/images/plan2.jpeg",
    "/images/plan3.jpeg",
  ];

  const handleOpenOverlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <>
      <motion.div
        key={1}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="parking-info py-3 py-lg-5"
        id="parking"
      >
        <div className="container">
          <div className="row py-4 px-3">
            <div className="col-12 col-lg-6 d-flex flex-column">
              <h2 className="text-primary fw-bold py-2">Park imkanlari</h2>
              <p>Araç park alanına ulaşmak için aşağıdaki navigasyon butonuna tıklayınız:</p>
              <a
                className="btn btn-primary"
                href="https://maps.app.goo.gl/rcR5fbzp2JZbcWh48?g_st=iw"
                target="_blank"
                rel="noreferrer"
              >
                Park Konumu
              </a>
            </div>

            <div className="col-12 col-lg-6 d-flex flex-column py-5 py-lg-0" id="location">
              <h2 className="text-primary fw-bold py-2">Merasim Alanına Nasıl Ulaşırım?</h2>
              <p>Merasim alanına ulaşmak için aşağıdaki navigasyon butonuna tıklayınız:</p>
              <a
                className="btn btn-primary"
                href="https://www.google.com/maps?sca_esv=f56a266850138bc2&lsig=AB86z5UxwMRtsMPHS9-i6N2suk9Z&biw=1720&bih=946&dpr=2&um=1&ie=UTF-8&fb=1&gl=at&sa=X&geocode=KSV1xJt8Bm1HMYakhdmV25nq&daddr=Angerer+Str.+14,+1210+Wien"
                target="_blank"
                rel="noreferrer"
              >
                Merasim Konumu
              </a>
            </div>

            <div className="col-12 col-lg-6 d-flex flex-column" id="seat">
              <h2 className="text-primary fw-bold py-2">Koltuk Yerim Nerede?</h2>
              <p>
                Koltuk numaranız girişte size verilen yönlendirme kağıtlarında mevcuttur. Oturma planına erişmek için 
                lütfen tıklayınız:
              </p>
              {/* Instead of a direct link, use a button that opens the overlay */}
              <button className="btn btn-primary" onClick={handleOpenOverlay}>
                Oturma Planı
              </button>
            </div>

            <div className="col-12 col-lg-6 d-flex flex-column py-5 py-lg-0" id="kermes">
              <h2 className="text-primary fw-bold py-2">Bu programda ikram var mı?</h2>
              <p>Program öncesi ve sonrası kafeteryada yiyecek ve içecekler ücret karşılığında temin edilebilir.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Overlay (conditionally rendered) */}
      {showOverlay && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          <div
            className="bg-white p-3 rounded"
            style={{ maxWidth: "600px", width: "90%" }}
          >
            <div className="d-flex justify-content-end">
              <button className="btn btn-sm btn-secondary" onClick={handleCloseOverlay}>
                Kapat
              </button>
            </div>
            <div className="mt-3">
              <h5 className="text-primary fw-bold mb-3">Oturma Planı Görselleri</h5>
              <div className="row">
                {images.map((imgSrc, idx) => (
                  <div className="col-12 col-md-4 mb-3" key={idx}>
                    <img
                      src={imgSrc}
                      alt={`Oturma Planı ${idx + 1}`}
                      className="img-fluid rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}