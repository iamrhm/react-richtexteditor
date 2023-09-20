function Menu() {
  return (
    <>
      <style jsx>
      {`
        .menu-box {
          display: flex;
          flex-direction: column;
          padding-top: 64px;
        }
        .option-box {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding-bottom: 18px;
        }
        .option-icon {
          width: 32px;
          height: 32px;
        }
        .option-details {
          height: 34px;
          width: calc(100% - 34px);
          padding: 0 12px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .option-name {
          height: 14px;
          width: 100%;
        }
        .option-count {
          height: 14px;
          width: 80%;
        }
        @media (max-width: 981px) {
          .menu-box {
            padding-top: 24px;
          }
        }
      `}
      </style>
      <div className="menu-box">
        {[1,2,3,4].map((data, index) => (
          <div className="option-box" key={index}>
            <div className="option-icon round loader">
            </div>
            <div className="option-details">
              <div className="option-name rectangle loader">
              </div>
              <div className="option-count rectangle loader">
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Menu;