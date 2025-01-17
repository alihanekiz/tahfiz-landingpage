import Image from 'next/image';
import './index.scss';


export default function Footer() {
  return (
    <footer className="py-5 text-white">
      <div className="container">
        <div className="row">
        <div className="col-12 col-lg-6 mt-2">
            <Image
                src="/branding/logo-full-horizontal.svg"
                width={200}
                height={100}
                alt="Tahfiz Logo"
              />
          </div>
          <div className="col-12 col-lg-6 mt-4">
              <h3>Tahfiz Hakkinda</h3>
              <ul className="px-1">
                <li><a href="https://tahfiz.org/tr/" target="_blank">Tahfiz Websitesi</a></li>
              </ul>
            </div>
          </div>
      </div>
      <div className="container py-2">
        <div className="row py-3">
          <div className="col-12 col-lg-6">
            <div className="pb-3">
              <div>
                Telefon: <a href="tel:+4367761841590">+43 677 618 415 90</a>
              </div>
              <div>
                E-Mail:{' '}
                <a href="mailto:info@tahfiz.org">info@tahfiz.org</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-3 copyright">
        <div className="row">
          <div className="col-12 py-3 d-flex justify-content-center">
            &#169; {new Date().getFullYear()} Tahfiz - by {' '}
            <a className="mx-1" href="https://uikz.at" target="_blank">UIKZ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}