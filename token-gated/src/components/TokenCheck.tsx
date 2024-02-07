"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
/* import { contractAddress } from "../constants"; */
import { useMbWallet } from "@mintbase-js/react";
import { ownedTokens, tokenOwnersByMetadataId } from "@mintbase-js/data";
import type { TokenOwnersByMetadataIdQueryResult } from "@mintbase-js/data/lib/api/tokenOwnersByMetadataId/tokenOwnersByMetadataId.types";
import { tokenMetadataId } from "@/app/constants";
import { NearWalletConnector } from "@/components/NearWalletSelector";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const TokenCheck = () => {
  //   const { contract } = useContract(contractAddress);
  const { isConnected, activeAccountId } = useMbWallet();

  const router = useRouter();

  const [ownedNfts, setOwnedNfts] = useState<any>(null);
  const [tokenOwner, setTokenOwner] = useState<any>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTokenOwner = async () => {
      try {
        const result = await tokenOwnersByMetadataId(tokenMetadataId || "");
        setTokenOwner(result?.data?.token);
        console.log("OWNER", result);
      } catch (error) {
        console.error("Error fetching owned NFTs:", error);
      }
    };

    // Call your functions
    if (isConnected) fetchTokenOwner();
  }, [activeAccountId]);

  //   useEffect(() => {
  //     if (nfts?.length) {
  //       router.push("/");
  //     }
  //   }, [nfts, router, address]);

  const isTokenOwner = tokenOwner?.find(
    (owner: any) => owner.owner === activeAccountId
  );

  console.log("IS TOKEN OWNER", isTokenOwner);

  return isConnected ? (
    <Card>
      <CardHeader>
        <CardTitle>Holder exclusive</CardTitle>
        <CardDescription>To unlock this product, you need:</CardDescription>
      </CardHeader>

      {/* {ContractData && (
        <div className={styles.nft}>
          <MediaRenderer
            src={ContractData.image}
            alt={ContractData.name}
            width="70px"
            height="70px"
          />
          <div className={styles.nftDetails}>
            <h4>{ContractData.name}</h4>
            <p>{ContractData.description.substring(0, 100)}...</p>
          </div>
        </div>
      )}
      {contractLoading && <p>Loading...</p>} */}
      <CardFooter>
        <NearWalletConnector />
      </CardFooter>
    </Card>
  ) : null;
};
