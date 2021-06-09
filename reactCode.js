import React from "react";
import "./style.css";
import tilesJson from "./tiles.json";

export const Presentational = (props) => <Page parentProps={props}/>;

const Page = (props) => {

  document.body.style.setProperty("overflow", `${
    props.parentProps.currModal 
      ? props.parentProps.currModal === "nav"
        ? "auto"
        : "hidden"
      : "auto"
  }`)

  return (
    <div>
      <Header parentProps={props.parentProps}/>
      <Main parentProps={props.parentProps}/>
    </div>
  );
}

const Header = (props) => {
  return (
    <header className="header">
      <div className={`logo-nav-wrapper${props.parentProps.currModal==="nav" ? " open" : ""}`}>
        <div className="logo">
          <img src="./src/images/logo.svg" alt="crowdfund logo."/>
        </div>
        <nav>
          <div
            onClick={props.parentProps.handleModal.bind(this, "nav")}
            className="icon"
          >
            <img
              src={props.parentProps.currModal==="nav"
                ? "./src/images/icon-close-menu.svg" 
                : "./src/images/icon-hamburger.svg"
              }alt=""
            />
          </div>
          <ul className="menu">
            <li><a href="#">About</a></li>
            <li><a href="#">Discover</a></li>
            <li><a href="#">Get Started</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

const Main = (props) => {
  return (
    <main className="main">
      <Section1
        parentProps={props.parentProps}
      />
      <Section2
        backed={props.parentProps.backing.backed}
        backers={props.parentProps.backing.backers}
      />
      <Section3
        parentProps={props.parentProps}
      />
      <PassModal
        parentProps={props.parentProps}
      />
      <div 
        className={
          `backdrop
          ${props.parentProps.currModal ? " visible" : ""}
          ${props.parentProps.currModal==="nav" ? " naved" : ""}
          `
        }
        onClick={props.parentProps.handleBD}
      />
    </main>
  );
}

const Section1 = (props) => {
  return (
    <section className="section1">
      <div className="mark-wrapper">
        <div className="mark">
          <img
            src="./src/images/logo-mastercraft.svg"
            alt="mastercraft logo."
          />
        </div>
      </div>
      <h1 className="title">Mastercraft Bamboo Monitor Riser</h1>
      <p>
        A beautifully handcrafted monitor stand to reduce neck and eye strain.
      </p>
      <div className="section1__btns-wrapper">
        <Button
          handleClick={props.parentProps.handleModal}
          clicker="pledge"
          text="Back this project"
        />
        <Bookmark
          handleBookmark={props.parentProps.handleBookmark}
          bookmarked={props.parentProps.bookmarked}
        />
      </div>
    </section>
  );
}

const Section2 = (props) => {
  // commafy, adds a comma after each three numbers (rtl)
  const commafy = (number) => number.toFixed(0).split("").reverse().join("").replace(/(\d{3})(?=\d)/g, `\$1,`).split("").reverse().join("");
  
  const backed = commafy(props.backed);
  const backers = commafy(props.backers)

  return (
    <section className="section2">
      <div className="numtext-wrapper">
        <NumText
          num={`$${backed}`}
          text="of $100,000 backed"
        />
        <NumText
          num={backers}
          text="total backers"
        />
        <NumText
          num="56"
          text="days left"
        />
      </div>
      <ProgressBar width={props.backed}/>
    </section>
  );
}

const Section3 = (props) => {

  const tiles = tilesJson
    .filter(tile => !tile.modalOnly)
    .map(tile => {
      return (
        <Tile
          key={tile.title}
          title={tile.title}
          subtitle={tile.subtitle}
          text={tile.text}
          numleft={tile.numleft}
          disabled={tile.disabled}
          parentProps={props.parentProps}
        />
      );
   });
  
  return (
    <section className="section3">
      <h2 className="title">
        About this project
      </h2>
      <section className="paragraph-wrapper">
        <p>
          The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen 
          to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve 
          your posture and make you more comfortable while at work, helping you stay focused on the task at hand.
        </p>
        <p>
          Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer 
          to allow notepads, pens, and USB sticks to be stored under the stand.  
        </p>
      </section>
      {tiles}
      <Modal
        parentProps={props.parentProps}
      />
    </section>
  );
}
 
const Modal = (props) => {

  const modalTiles = tilesJson.map(tile => {
    return (
      <ModalTile
        key={tile.title}
        title={tile.title}
        subtitle={tile.subtitle}
        text={tile.text}
        numleft={tile.numleft}
        pledgeValue={tile.pledgeValue}
        disabled={tile.disabled}
        parentProps={props.parentProps}
      />
    );
  });

  return (
    <div className={`modal-wrapper${props.parentProps.currModal==="pledge" ? " open" : ""}`}>
      <div className="modal">
        <header>
          <div className="title-close">
            <h2 className="title">Back this project</h2>
            <div
              className="icon"
              onClick={props.parentProps.handleModal.bind(this, "pledge")}
            >
              <img src="./src/images/icon-close-modal.svg"/>
            </div>
          </div>
          <p className="modal__subtitle">
            Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?
          </p>
        </header>
        {modalTiles}
      </div>
    </div>
  );
}

const Tile = (props) => {
  return (
    <div className={`section3__tile${props.disabled ? " disabled" : ""}`}>
      <div className="tile-title">
        <h3 className="title">{props.title}</h3>
        <span>{props.subtitle}</span>
      </div>
      <p>{props.text}</p>
      <div className="lefts">
        <b>{props.numleft}</b>
        <span>left</span>
      </div>
      <Button
        disabled={props.disabled}
        text={props.disabled ? "Out of Stock" : "Select Reward"}
        handleClick={props.parentProps.handleModal}
        clicker="pledge"
      />
    </div>
  );
}

const ModalTile = (props) => {

  const radioId = props.title.split(" ").join("_");
  const radioAttrs = {
    id: radioId
    , name: "pledge"
    , type: "radio"
    , onChange: props.parentProps.handlePledgeSelection.bind(this, props.pledgeValue)
  };
  if(props.disabled) {radioAttrs.disabled = "disabled"};

  const pledgeForm = (
    <PlegeForm
      pledgeValue={props.parentProps.pledgeValue}
      handlePledgeInput={props.parentProps.handlePledgeInput}
      handlePledgeSubmit={props.parentProps.handlePledgeSubmit}
    />
  );

  return (
    <div 
      className={`modal__tile
      ${props.disabled ? " disabled" : ""}
      ${props.parentProps.selectedPledge === radioId ? " selected" : ""}
      `}
    >
      <div className="modal__tile-top">
        <div className="radio-title-wrapper">
          <div className="radio-wrapper">
            <input {...radioAttrs}/>
            <label htmlFor={radioId}/>
          </div>
          <div className="tile-title">
            <label htmlFor={radioId} className="title">{props.title}</label>
            {props.subtitle ? <span>{props.subtitle}</span> : ""}
          </div>
        </div>
        <p>{props.text}</p>
        {
          typeof props.numleft === "number"
          ? (<div className="lefts">
              <b>{props.numleft}</b>
              <span>left</span>
            </div>)
          : ""
        }
      </div>
      {props.parentProps.selectedPledge === radioId && pledgeForm}
    </div>
  );
}

const PlegeForm = (props) => {
  return (
    <form className="pledge-form">
      <hr/>
      <div className="pledge-form-inner">
        <p>Enter your pledge</p>
        <div className="input-button-wrapper">
          <div className="input-wrapper">
            <span>$</span>
            <input
              type="text"
              value={props.pledgeValue}
              onChange={props.handlePledgeInput.bind(this)}
            />
          </div>
          <Button
            text="Continue"
            handleClick={props.handlePledgeSubmit}
            clicker="pass"
          />
        </div>
      </div>
    </form>
  );
}

const ProgressBar = (props) => {
  return (
    <div className="progress-bar-wrapper">
      <div style={{width: `${props.width/1000}%`}} className="progress-bar"/>
    </div>
  );
}

const NumText = (props) => {
  return (
    <div className="numtext-flex">
      <div className={props.class ? props.class : "section2__numtext"}>
        <b>{props.num}</b>
        <span>{props.text}</span>
      </div>
    </div>
  );
}

const Button = (props) => {

  const buttonAttrs = {
    className: `button${props.disabled ? " disabled" : ""}`
  }
  
  if (!props.disabled) {
    if (props.handleClick) {
      buttonAttrs.onClick = props.clicker 
        ? props.handleClick.bind(this, props.clicker)
        : props.handleClick.bind(this)
    }
  }

  return (
    <button {...buttonAttrs}>
      {props.text}
    </button>
  );
}

const Bookmark = (props) => {

  const iconSrc = (
    props.bookmarked 
      ? "./src/images/icon-bookmarked.svg" 
      : "./src/images/icon-bookmark.svg"
  );

  return (
    <div
      className={`bookmark-wrapper${props.bookmarked ? " bookmarked" : ""}`}
      onClick={props.handleBookmark}
    >
      <div 
        className="bookmark-icon"
      >
        <img src={iconSrc} alt=""/>
      </div>
      <b>{props.bookmarked ? "Bookmarked" : "Bookmark"}</b>
    </div>
  );
}

const PassModal = (props) => {
  return (
    <div className={`modal-wrapper${props.parentProps.currModal==="pass" ? " open" : ""}`}>
      <div className="modal passmodal">
        <div className="check-icon">
          <img src="./src/images/icon-check.svg"/>
        </div>
        <h2 className="title">Thanks for your support!</h2>
        <p>Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get
        an email once our campaign is completed.
        </p>
        <Button
          text="Got it!"
          handleClick={props.parentProps.handleModal}
          clicker="pass"
        />
      </div>
    </div>
  );
}