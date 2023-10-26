import Block from "./components/block/block";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Topbar from "./components/topbar/topbar";

function App() {
  const [chain, setChain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mining, setMining] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://blockchain-implementation-from-scratch-frontend-70j4qmoad.vercel.app/display_blockchain"
      )
      .then((res) => {
        console.log(res.data.chain);
        setChain(res.data.chain.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAddBlock = () => {
    setMining(true);
    axios
      .get(
        "https://blockchain-implementation-from-scratch-frontend-70j4qmoad.vercel.app/mine_block"
      )
      .then((res) => {
        setMining(false);
        console.log(res.data);
        setChain(res.data.chain.reverse());
      })
      .catch((err) => {
        console.log(err);
        setMining(false);
      });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (mining) {
    return (
      <div className="mining">
        <div>Mining...</div>
        <div>Fetching last block...</div>
        <div>Finding proof of work...</div>
        <div>Hashing previous block...</div>
        <div>Adding block to chain...</div>
      </div>
    );
  }

  return (
    <>
      <Topbar handleAddBlock={handleAddBlock} />
      <div className="blockchain">
        {chain.map((block) => (
          <Block
            index={block.index}
            timestamp={block.timestamp}
            data={block.data}
            proof={block.proof}
            previous_hash={block.previous_hash}
          />
        ))}
      </div>
    </>
  );
}

export default App;
