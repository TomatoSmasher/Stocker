import { useRouter } from "next/router";
import StockOverview from "../../../components/Quote-Sections/StockOverview";

import OverviewGeneral from "../../../components/Quote-Sections/Quote-General/OverviewGeneral";
import IndexesQuote from "../../../components/general-components/IndexsQuote";

const Financials = (props: any) => {
  const router = useRouter();

  return (
    <div>
      <IndexesQuote indexData={props.indexData} />

      <StockOverview
        symbol={props.symbol}
        historicalData={props.historicalData}
        image={props.image}
      />
      <OverviewGeneral data={props.symbol} general={props.image} />
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const fetchOverview = await fetch(
    `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${context.params.symbol.toUpperCase()}&apikey=GFFC2KM2F1R72KZB`
  );

  const data = await fetchOverview.json();

  const fetchImage = await fetch(
    `https://financialmodelingprep.com/api/v3/profile/${context.params.symbol.toUpperCase()}?apikey=1e926fa4ba9f6260f956428ecb9f6a63`
  );

  const imageData = await fetchImage.json();

  const fetchHistoricalPrice = await fetch(
    `https://api.twelvedata.com/time_series?symbol=${context.params.symbol.toUpperCase()}&interval=1day&outputsize=2000&apikey=a24970c9566c49739e8009cdb3a639f0`
  );

  const historicalData = await fetchHistoricalPrice.json();

  const fetchGSPCIndex = await fetch(
    `https://financialmodelingprep.com/api/v3/quote/%5EGSPC?apikey=ac54a1b35f7700a8b1bdeb404dc14810`
  );
  const GSPCIndexData = await fetchGSPCIndex.json();

  const fetchDowIndex = await fetch(
    `https://financialmodelingprep.com/api/v3/quote/%5EDJI?apikey=ac54a1b35f7700a8b1bdeb404dc14810`
  );
  const DowIndexData = await fetchDowIndex.json();

  const fetchIXICIndex = await fetch(
    `https://financialmodelingprep.com/api/v3/quote/%5EIXIC?apikey=ac54a1b35f7700a8b1bdeb404dc14810`
  );

  const IXICIndexData = await fetchIXICIndex.json();

  const fetchRUTIndex = await fetch(
    `https://financialmodelingprep.com/api/v3/quote/%5ERUT?apikey=ac54a1b35f7700a8b1bdeb404dc14810`
  );

  const RUTIndexData = await fetchRUTIndex.json();
  let indexData: any = [];
  indexData.push(
    ...GSPCIndexData,
    ...DowIndexData,
    ...IXICIndexData,
    ...RUTIndexData
  );
  return {
    props: {
      symbol: data,
      historicalData: historicalData,
      image: imageData,
      indexData: indexData,
    },
  };
}

export default Financials;
