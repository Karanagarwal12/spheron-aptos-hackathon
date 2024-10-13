import { WalletSelector } from "./WalletSelector";
import SlideshowIcon from '@mui/icons-material/Slideshow';
import '../styles/header.scss';

export function Header() {
  return (
    <div id="header">
      <div></div>
      <h5 className="display">Fixed Planning <SlideshowIcon /></h5>

      <div className="walletSelector flex gap-2 items-center flex-wrap">
        <WalletSelector />
      </div>
    </div>
  );
}
