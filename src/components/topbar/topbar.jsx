import "./topbar.css";

const Topbar = ({ handleAddBlock }) => {
  return (
    <div className="topbar">
      <h1 className="title">miner.io</h1>
      <button className="button" onClick={handleAddBlock}>
        Mine Block
      </button>
    </div>
  );
};

export default Topbar;
