import { Connector, useConnect } from "@starknet-react/core";
import { useRef, useState } from "react";
import Wallet from "~~/components/scaffold-stark/CustomConnectButton/Wallet";
import { useLocalStorage } from "usehooks-ts";
import { BurnerConnector, burnerAccounts } from "@scaffold-stark/stark-burner";
import { useTheme } from "next-themes";
import { BlockieAvatar } from "~~/components/tokasa/BlockieAvatar";
import GenericModal from "./GenericModal";
import { LAST_CONNECTED_TIME_LOCALSTORAGE_KEY } from "~~/utils/Constants";
import {
  tokasaButton,
  tokasaButtonOutline,
} from "~~/components/tokasa/tailwind-tokasa";

const loader = ({ src }: { src: string }) => {
  return src;
};

const ConnectModal = () => {
  const modalRef = useRef<HTMLInputElement>(null);
  const [isBurnerWallet, setIsBurnerWallet] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const { connectors, connect, error, status, ...props } = useConnect();
  const [_, setLastConnector] = useLocalStorage<{ id: string; ix?: number }>(
    "lastUsedConnector",
    { id: "" },
    {
      initializeWithValue: false,
    },
  );
  const [, setLastConnectionTime] = useLocalStorage<number>(
    LAST_CONNECTED_TIME_LOCALSTORAGE_KEY,
    0,
  );

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.checked = false;
    }
  };

  function handleConnectWallet(
    e: React.MouseEvent<HTMLButtonElement>,
    connector: Connector,
  ): void {
    if (connector.id === "burner-wallet") {
      setIsBurnerWallet(true);
      return;
    }
    connect({ connector });
    setLastConnector({ id: connector.id });
    setLastConnectionTime(Date.now());
    handleCloseModal();
  }

  function handleConnectBurner(
    e: React.MouseEvent<HTMLButtonElement>,
    ix: number,
  ) {
    const connector = connectors.find((it) => it.id == "burner-wallet");
    if (connector && connector instanceof BurnerConnector) {
      connector.burnerAccount = burnerAccounts[ix];
      connect({ connector });
      setLastConnector({ id: connector.id, ix });
      setLastConnectionTime(Date.now());
      handleCloseModal();
    }
  }

  return (
    <div>
      <label
        htmlFor="connect-modal"
        className={`${tokasaButton} cursor-pointer`}
      >
        <span>Connect</span>
      </label>

      <input
        ref={modalRef}
        type="checkbox"
        id="connect-modal"
        className="modal-toggle"
      />
      <GenericModal modalId="connect-modal">
        <>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {isBurnerWallet ? "Choose account" : "Connect a Wallet"}
            </h3>
            <label
              onClick={() => setIsBurnerWallet(false)}
              htmlFor="connect-modal"
              className="btn btn-ghost btn-sm btn-circle cursor-pointer"
            >
              ✕
            </label>
          </div>
          <div className="flex flex-col flex-1 lg:grid">
            <div className="flex flex-col gap-4 w-full px-8 py-10">
              {!isBurnerWallet ? (
                connectors.map((connector, index) => (
                  <Wallet
                    key={connector.id || index}
                    connector={connector}
                    loader={loader}
                    handleConnectWallet={handleConnectWallet}
                  />
                ))
              ) : (
                <div className="flex flex-col pb-[20px] justify-end gap-3">
                  <div className="h-[300px] overflow-y-auto flex w-full flex-col gap-2">
                    {burnerAccounts.map((burnerAcc, ix) => (
                      <div
                        key={burnerAcc.publicKey}
                        className="w-full flex flex-col"
                      >
                        <button
                          className={`${tokasaButtonOutline} flex items-center gap-3`}
                          onClick={(e) => handleConnectBurner(e, ix)}
                        >
                          <BlockieAvatar
                            address={burnerAcc.accountAddress}
                            size={35}
                          />
                          {`${burnerAcc.accountAddress.slice(
                            0,
                            6,
                          )}...${burnerAcc.accountAddress.slice(-4)}`}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      </GenericModal>
    </div>
  );
};

export default ConnectModal;
