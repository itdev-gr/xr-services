import OptimizedImage from './OptimizedImage';

export default function FundingBanners() {
  return (
    <div className="border-t border-white/10">
      <div className="container-xl py-6 md:py-7 flex items-center justify-center w-full">
        <OptimizedImage
          src="/banners/espa-epanek.png"
          alt="Επιχορήγηση Επιχειρήσεων Λογιστών - Φοροτεχνικών — ΕΣΠΑ 2014-2020"
          className="block h-[6.5rem] sm:h-28 md:h-32 lg:h-36 w-auto max-w-[min(100%,52rem)] object-contain"
          mobileSrc={false}
        />
      </div>
    </div>
  );
}
