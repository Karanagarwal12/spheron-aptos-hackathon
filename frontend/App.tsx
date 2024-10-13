import { useWallet } from "@aptos-labs/wallet-adapter-react";
// Internal Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import Posts from "./components/Posts";
import { WalletDetails } from "@/components/WalletDetails";
import { NetworkInfo } from "@/components/NetworkInfo";
import { AccountInfo } from "@/components/AccountInfo";
import { TransferAPT } from "@/components/TransferAPT";
import { MessageBoard } from "@/components/MessageBoard";
import Tickets from "./components/Ticket";

import './app.scss';
import { useEffect, useRef } from "react";

function App() {
  const { connected } = useWallet();
  const mouseFollower = useRef<HTMLDivElement | null>(null);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (mouseFollower.current) {
      mouseFollower.current.style.top = `${event.clientY}px`; // Set Y position
      mouseFollower.current.style.left = `${event.clientX}px`; // Set X position
    }
  };
  useEffect(() => {
    const mainbg = document.getElementById("bg");
    function lines() {
      let sizeW = Math.random() * 22;
      let duration = Math.random() * 3;
      let e = document.createElement("div");
      e.setAttribute("class", "circle");
      mainbg?.appendChild(e);
      e.style.width = 12 + sizeW + "px";
      e.style.left = Math.random() * +innerWidth + "px";
      e.style.animationDuration = 3 + duration + "s";

      setTimeout(function () {
        mainbg?.removeChild(e);
      }, 6000);
    }
    setInterval(function () {
      lines();
    }, 400);
  }, [])
  return (
    <div id="main" onMouseMove={handleMouseMove}>
      <Tickets />
      <div className="mouseFollower"  ref={mouseFollower}></div>
      <div id="bg"></div>
      <Header />
      <Posts />
      <div className="flex items-center justify-center flex-col">
        {connected ? (
          <Card>
            {/* <CardContent className="flex flex-col gap-10 pt-6">
              <WalletDetails />
              <NetworkInfo />
              <AccountInfo />
              <TransferAPT />
              <MessageBoard />
            </CardContent> */}
          </Card>
        ) : (
          <CardHeader>
            <CardTitle>To get started Connect a wallet</CardTitle>
          </CardHeader>
        )}
      </div>
    </div>
  );
}

export default App;
