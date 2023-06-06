import {memo} from "react";
import NFT from "./NFT";
import {useNFTsQuery} from "../../clients/nfts";
import {LoadingScreen} from "../../screens/LoadingScreen";
import {ErrorScreen} from "../../screens/ErrorScreen";
import {BoxProps, Grid, Text} from "@chakra-ui/react";

interface NFTsProps extends BoxProps {
  address?: string;
}

const NFTs = memo(function Achievements({address, ...boxProps}: NFTsProps) {
  const ownedNFTsQuery = useNFTsQuery(address);
  if (!address) {
    return <Text size="sm">No Address to Assoicate Achievements</Text>;
  }

  if (ownedNFTsQuery.isLoading) {
    return <LoadingScreen />;
  }

  if (!ownedNFTsQuery.data) {
    return <ErrorScreen />;
  }

  const ownedNfts = ownedNFTsQuery.data.ownedNfts;
  return (
    <>
      <Grid {...boxProps} templateColumns="repeat(8, 1fr)" gap={6}>
        {ownedNfts.map((value, idx) => (
          <NFT
            key={idx}
            title={value.title}
            imageUrl={value.metadata.image!}
            address={value.contract.address}
            tokenId={value.id.tokenId}
          />
        ))}
      </Grid>
      {ownedNfts.length === 0 && (
        <Text color="gray.500" size="sm">
          No Achievements for Address
        </Text>
      )}
    </>
  );
});

export default NFTs;