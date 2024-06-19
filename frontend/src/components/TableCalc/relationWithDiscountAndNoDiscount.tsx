
const relationWithDiscountAndNoDiscount = (
    a: number | string,
    b: number | string,
    white = true
  ) => (
    <>
      {a === b ? (
        a
      ) : (
        <>
          <div
            style={{
              color: "gray",
              position: "absolute",
              left: 2,
              top: 3,
              fontSize: 12,
            }}
          >
            {b}
          </div>
          <div
            style={
              white
                ? {
                  background: "white",
                  fontWeight: "bold",
                }
                : {
                  background: "rgb(248,248,248)",
                  fontWeight: "bold",
                }
            }
          >
            {a}
          </div>
        </>
      )}
    </>
  );
  
  export default relationWithDiscountAndNoDiscount