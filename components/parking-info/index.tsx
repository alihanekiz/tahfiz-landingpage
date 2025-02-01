"use client";
import { motion } from "motion/react";
import "./index.scss";

export default function ParkingInfo() {
    return (
        <motion.div
            key={1}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="parking-info py-3 py-lg-5" 
            id="parking">
            <div className="container">
                <div className="row py-4 px-3">
                    <div className="col-12 col-lg-6 d-flex flex-column">
                        <h2 className="text-primary fw-bold py-2">Park imkanlari</h2>
                        <p>Araç park alanına ulaşmak için aşağıdaki navigasyon butonuna tıklayınız:</p>
                        <a className="btn btn-primary" href="https://maps.app.goo.gl/rcR5fbzp2JZbcWh48?g_st=iw" target="_blank">Park Konumu</a>
                    </div>
                    <div className="col-12 col-lg-6 d-flex flex-column py-5 py-lg-0" id="location">
                        <h2 className="text-primary fw-bold py-2">Merasim Alanına Nasıl Ulaşırım?</h2>
                        <p>Merasim alanına ulaşmak için aşağıdaki navigasyon butonuna tıklayınız:</p>
                        <a className="btn btn-primary" href="https://www.google.com/maps?sca_esv=f56a266850138bc2&lsig=AB86z5UxwMRtsMPHS9-i6N2suk9Z&biw=1720&bih=946&dpr=2&um=1&ie=UTF-8&fb=1&gl=at&sa=X&geocode=KSV1xJt8Bm1HMYakhdmV25nq&daddr=Angerer+Str.+14,+1210+Wien" target="_blank">Merasim Konumu</a>
                    </div>
                    <div className="col-12 col-lg-6 d-flex flex-column" id="seat">
                        <h2 className="text-primary fw-bold py-2">Koltuk Yerim Nerede?</h2>
                        <p>Koltuk numaranız girişte size verilen yönlendirme kağıtlarında mevcuttur. Oturma planına erişmek için lütfen tıklayınız:</p>
                        <a className="btn btn-primary" href="https://www.vhs.at/de/ueber-die-vhs/veranstaltungszentren#1210-wien-veranstaltungszentrum-floridsdorf" target="_blank">Oturma Planı</a>
                    </div>
                    <div className="col-12 col-lg-6 d-flex flex-column py-5 py-lg-0" id="kermes">
                        <h2 className="text-primary fw-bold py-2">Kermes Alanına Nasıl Giderim?</h2>
                        <p>Kermes alanına ulaşmak için aşağıdaki navigasyon butonuna tıklayınız:</p>
                        <p>Not: Ikramimiz sadece pasta ve kahveden olusuyor.</p>
                        <a className="btn btn-primary" href="https://maps.app.goo.gl/rcR5fbzp2JZbcWh48?g_st=iw" target="_blank">Kermes Konumu</a>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}