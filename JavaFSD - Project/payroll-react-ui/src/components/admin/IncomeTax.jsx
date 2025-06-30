import { useEffect, useState } from "react";
import axios from "axios";

function IncomeTax() {
  const [slabs, setSlabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSlabs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/tax-slabs/income/getAll",
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") },
          }
        );
        setSlabs(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getSlabs();
  }, []);

  // Group by (financialYear, taxRegime)
  const slabsByGroup = slabs.reduce((acc, slab) => {
    const grp = `${slab.financialYear}__${slab.taxRegime}`;
    if (!acc[grp]) acc[grp] = [];
    acc[grp].push(slab);
    return acc;
  }, {});

  // Helper for Indian currency style
  const inr = n =>
    n >= 1e9
      ? "No limit"
      : Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

  return (
    <main>
      <button className="btn btn-primary btn-sm" style={{
        fontSize: "1.05rem",
        fontWeight: 600,
        background: "#2563eb",
        border: "none",
        borderRadius: "6px",
        padding: "0.6em 1.5em",
        marginBottom: "2em"
      }}>
        Add +
      </button>

      {loading && <p style={{ color: "#fff" }}>Loading...</p>}

      {!loading && Object.keys(slabsByGroup).map((groupKey, idx) => {
        const [financialYear, taxRegime] = groupKey.split("__");
        const groupSlabs = slabsByGroup[groupKey];

        return (
          <div
            key={groupKey}
            className="transparent-card"
            style={{
              background: "#191B2A",
              borderRadius: "2em",
              margin: "2.5em auto",
              padding: "2.3em",
              maxWidth: 950,
              minHeight: 300,
              boxShadow: "0 2px 32px 0 #0003"
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2.1rem'
            }}>
              <h2 style={{
                color: "#6563FF",
                fontWeight: 600,
                fontSize: "2rem",
                margin: 0,
                letterSpacing: "0.08em"
              }}>
                Financial Year: {financialYear} ({taxRegime} Regime)
              </h2>
            </div>
            <table
              className="table table-bordered table-hover"
              style={{
                background: "transparent",
                color: "#fff",
                fontSize: "1.18rem",
                borderRadius: "10px",
                overflow: "hidden"
              }}
            >
              <thead>
                <tr>
                  <th style={{ color: "#6563FF", fontWeight: 700 }}>Min Income</th>
                  <th style={{ color: "#6563FF", fontWeight: 700 }}>Max Income</th>
                  <th style={{ color: "#6563FF", fontWeight: 700 }}>Tax Rate (%)</th>
                  <th style={{ color: "#6563FF", fontWeight: 700 }}>Surcharge (%)</th>
                </tr>
              </thead>
              <tbody>
                {groupSlabs.map((slab, i) => (
                  <tr
                    key={slab.id ?? i}
                    style={{
                      background: i % 2 === 0 ? "#23263A" : "#191B2A",
                      color: "#fff",
                      fontWeight: 500
                    }}
                  >
                    <td>{inr(slab.minAnnualIncome)}</td>
                    <td>{inr(slab.maxAnnualIncome)}</td>
                    <td>{slab.taxRatePercentage}</td>
                    <td>{slab.surcharge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: "right", marginTop: "2em" }}>
              <button
                className="btn btn-primary btn-sm"
                style={{
                  background: "#2563eb",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  outline: "none",
                  boxShadow: "0 2px 8px #1e40af22",
                  padding: "0.6em 2.2em"
                }}
              >
                Edit
              </button>
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default IncomeTax;