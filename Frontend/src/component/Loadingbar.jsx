import React from 'react'

const Loadingbar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 50,
    width: '90%',
    margin : 'auto',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
  }

  const labelStyles = {
    lineHeight : "45px",
    height: "100%",
    paddingRight : '10px',
    margin: '5px',
    color: 'white',
    fontWeight: 'bold'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <div style={labelStyles}>{`${completed}%`}</div>
      </div>
    </div>
  );
};

export default Loadingbar;