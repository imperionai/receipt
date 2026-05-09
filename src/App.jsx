import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import LOGO from "./assets/logo.jpeg";
const SIGN = "data:image/jpeg;base64,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";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const SPORTS = ["Cricket","Badminton","Swimming","Karate","Dance","Crossfit"];
const MODES  = ["UPI","Cash"];

const ones = ["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"];
const tens_ = ["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

function numWords(n) {
  if (n === 0) return "Zero";
  let w = "";
  if (n >= 100000) { w += numWords(Math.floor(n/100000)) + " Lakh "; n %= 100000; }
  if (n >= 1000)   { w += numWords(Math.floor(n/1000))   + " Thousand "; n %= 1000; }
  if (n >= 100)    { w += ones[Math.floor(n/100)] + " Hundred "; n %= 100; }
  if (n >= 20)     { w += tens_[Math.floor(n/10)] + " "; n %= 10; }
  if (n > 0)       w += ones[n] + " ";
  return w.trim();
}

function amountWords(a) {
  const n = parseInt(a, 10);
  return (isNaN(n)||n<=0) ? "" : numWords(n) + " Rupees Only";
}

function genReceiptNo() {
  const d = new Date();
  return "ABC" + d.getFullYear().toString().slice(-2) +
    String(d.getMonth()+1).padStart(2,"0") +
    String(d.getDate()).padStart(2,"0") +
    String(d.getHours()).padStart(2,"0") +
    String(d.getMinutes()).padStart(2,"0") +
    String(d.getSeconds()).padStart(2,"0");
}

const today = new Date().toISOString().split("T")[0];
const EMPTY = {
  name:"", batch:"", type_:"", phone:"",
  pdate: today,
  day: String(new Date().getDate()),
  month: MONTHS[new Date().getMonth()],
  year: String(new Date().getFullYear()),
  mode:"", amount:""
};

export default function App() {
  const [f, setF] = useState(EMPTY);
  const [err, setErr] = useState({});
  const [receipt, setReceipt] = useState(null);
  const [dl, setDl] = useState(false);
  const ref = useRef(null);

  const ch = e => {
    const {name,value} = e.target;
    setF(p=>({...p,[name]:value}));
    if(err[name]) setErr(p=>({...p,[name]:null}));
  };

  function validate() {
    const e={};
    if(!f.name.trim()) e.name="Required";
    if(!f.batch) e.batch="Required";
    if(!f.type_) e.type_="Required";
    if(!/^\d{10}$/.test(f.phone)) e.phone="Must be 10 digits";
    if(!f.pdate) e.pdate="Required";
    if(!f.day||isNaN(f.day)||+f.day<1||+f.day>31) e.day="Invalid";
    if(!f.month) e.month="Required";
    if(!f.year||isNaN(f.year)||+f.year<2000) e.year="Invalid year";
    if(!f.mode) e.mode="Required";
    if(!f.amount||isNaN(f.amount)||+f.amount<=0) e.amount="Must be > 0";
    return e;
  }

  function view() {
    const e=validate();
    if(Object.keys(e).length){setErr(e);return;}
    setReceipt({...f, rno: genReceiptNo()});
  }

  async function download() {
    if(!ref.current) return;
    setDl(true);
    try {
      const canvas = await html2canvas(ref.current,{scale:2,useCORS:true,backgroundColor:"#fff"});
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
      const pw=210,ph=297;
      const iw=pw, ih=(canvas.height*pw)/canvas.width;
      pdf.addImage(img,"PNG",0,(ph-Math.min(ih,ph))/2,iw,Math.min(ih,ph));
      pdf.save("Receipt_"+receipt.rno+"_"+receipt.name.replace(/\s+/g,"_")+".pdf");
    } catch(ex) {
      alert("PDF generation failed: "+ex.message);
    }
    setDl(false);
  }

  function reset() { setF(EMPTY); setErr({}); setReceipt(null); }

  const S={
    label:{display:"block",fontSize:11,fontWeight:700,color:"#555",marginBottom:4,letterSpacing:"0.08em",textTransform:"uppercase"},
    input:{width:"100%",border:"1px solid #d1d5db",borderRadius:4,padding:"8px 10px",fontSize:13,outline:"none",boxSizing:"border-box",background:"#fff",color:"#111",fontFamily:"inherit"},
    err:{color:"#dc2626",fontSize:11,marginTop:2},
    btn:(bg,fg,bdr)=>({background:bg,color:fg,border:`1.5px solid ${bdr||bg}`,padding:"9px 20px",borderRadius:4,fontSize:12,fontWeight:700,cursor:"pointer",letterSpacing:"0.1em",fontFamily:"inherit"})
  };

  return (
    <div style={{minHeight:"100vh",background:"#f3f4f0",fontFamily:"'Georgia',serif"}}>
      <header style={{background:"#111",color:"#fff",padding:"14px 28px",display:"flex",alignItems:"center",gap:14}}>
        <img src={LOGO} alt="Logo" style={{height:44,width:44,objectFit:"contain"}} />
        <div>
          <div style={{fontFamily:"'Georgia',serif",fontSize:17,fontWeight:700,letterSpacing:3}}>ARJUNA BADMINTON CLUB</div>
          <div style={{fontSize:10,color:"#999",letterSpacing:1}}>Receipt Management System</div>
        </div>
        <div style={{marginLeft:"auto",fontSize:10,color:"#666"}}>
          {new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"})}
        </div>
      </header>

      <div style={{maxWidth:1140,margin:"0 auto",padding:"28px 16px",display:"grid",gridTemplateColumns:receipt?"1fr 1fr":"580px 1fr",gap:28,alignItems:"start"}}>
        {/* FORM */}
        <div style={{background:"#fff",borderRadius:4,padding:28,border:"1px solid #ddd",boxShadow:"0 1px 6px rgba(0,0,0,0.06)"}}>
          <h2 style={{fontSize:15,fontWeight:700,color: "#000",borderBottom:"2px solid #111",paddingBottom:8,marginTop:0,marginBottom:22,letterSpacing:2}}>NEW RECEIPT</h2>

          <div style={{display:"grid",gap:14}}>
            {/* Student Name */}
            <div>
              <label style={S.label}>Student Name *</label>
              <input style={S.input} name="name" value={f.name} onChange={ch} placeholder="Full name" />
              {err.name && <p style={S.err}>{err.name}</p>}
            </div>

            {/* Batch — dropdown + free-type */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div>
                <label style={S.label}>Batch *</label>
                <select style={S.input} name="batch" value={SPORTS.includes(f.batch)?f.batch:"__custom"} onChange={e=>{
                  if(e.target.value==="__custom") setF(p=>({...p,batch:""}));
                  else ch(e);
                }}>
                  <option value="">Select batch</option>
                  {SPORTS.map(s=><option key={s}>{s}</option>)}
                  <option value="__custom">Other (type below)</option>
                </select>
                {(!SPORTS.includes(f.batch)) && (
                  <input style={{...S.input,marginTop:6}} name="batch" value={f.batch} onChange={ch} placeholder="Type batch name" />
                )}
                {err.batch && <p style={S.err}>{err.batch}</p>}
              </div>
              <div>
                <label style={S.label}>Type *</label>
                <select style={S.input} name="type_" value={f.type_} onChange={ch}>
                  <option value="">Select type</option>
                  {SPORTS.map(s=><option key={s}>{s}</option>)}
                </select>
                {err.type_ && <p style={S.err}>{err.type_}</p>}
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div>
                <label style={S.label}>Phone Number *</label>
                <input style={S.input} name="phone" value={f.phone} onChange={ch} placeholder="10 digits" maxLength={10} />
                {err.phone && <p style={S.err}>{err.phone}</p>}
              </div>
              <div>
                <label style={S.label}>Payment Date *</label>
                <input style={S.input} type="date" name="pdate" value={f.pdate} onChange={ch} />
                {err.pdate && <p style={S.err}>{err.pdate}</p>}
              </div>
            </div>

            {/* For Month */}
            <div>
              <label style={S.label}>For Month (Day / Month / Year) *</label>
              <div style={{display:"grid",gridTemplateColumns:"72px 1fr 90px",gap:8}}>
                <div>
                  
                </div>
                <div>
                  <select style={S.input} name="month" value={f.month} onChange={ch}>
                    {MONTHS.map(m=><option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <input style={S.input} name="year" value={f.year} onChange={ch} placeholder="Year" type="number" />
                  {err.year && <p style={S.err}>{err.year}</p>}
                </div>
              </div>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div>
                <label style={S.label}>Payment Mode *</label>
                <select style={S.input} name="mode" value={f.mode} onChange={ch}>
                  <option value="">Select mode</option>
                  {MODES.map(m=><option key={m}>{m}</option>)}
                </select>
                {err.mode && <p style={S.err}>{err.mode}</p>}
              </div>
              <div>
                <label style={S.label}>Amount Paid (₹) *</label>
                <input style={S.input} name="amount" value={f.amount} onChange={ch} placeholder="0" type="number" min={1} />
                {err.amount && <p style={S.err}>{err.amount}</p>}
              </div>
            </div>

            {f.amount && +f.amount>0 && (
              <div style={{background:"#f8f7f2",border:"1px dashed #ccc",borderRadius:4,padding:"9px 12px",fontSize:12,color:"#444",lineHeight:1.4}}>
                <span style={{fontWeight:700}}>In words: </span>{amountWords(f.amount)}
              </div>
            )}
          </div>

          <div style={{display:"flex",gap:10,marginTop:24,flexWrap:"wrap"}}>
            <button onClick={view} style={S.btn("#111","#fff")}>VIEW RECEIPT</button>
            {receipt && <button onClick={download} disabled={dl} style={S.btn(dl?"#888":"#1a5c1a","#fff")}>{dl?"GENERATING…":"DOWNLOAD PDF"}</button>}
            <button onClick={reset} style={S.btn("#fff","#111","#111")}>RESET</button>
          </div>
        </div>

        {/* PREVIEW */}
        {receipt ? (
          <div style={{background:"#fff",borderRadius:4,padding:20,border:"1px solid #ddd",boxShadow:"0 1px 6px rgba(0,0,0,0.06)",overflowY:"auto",maxHeight:"88vh"}}>
            <h2 style={{fontSize:13,fontWeight:700,borderBottom:"2px solid #111",paddingBottom:6,marginTop:0,marginBottom:16,letterSpacing:2}}>RECEIPT PREVIEW</h2>
            <Receipt r={receipt} previewRef={ref} />
          </div>
        ) : (
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:320,color:"#bbb",textAlign:"center"}}>
            <div>
              <div style={{fontSize:52,marginBottom:12}}>🏸</div>
              <div style={{fontSize:13,letterSpacing:1}}>Fill the form &amp; click<br/><strong style={{color:"#555"}}>VIEW RECEIPT</strong></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Receipt({r, previewRef}) {
  const {rno,name,batch,type_,phone,pdate,day,month,year,mode,amount} = r;
  const dStr = new Date(pdate).toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"});
  const words = amountWords(amount);
  const amt = parseInt(amount).toLocaleString("en-IN");

  const HR = ()=><hr style={{border:"none",borderTop:"1px solid #999",margin:"10px 0"}} />;
  const DHR = ()=><hr style={{border:"none",borderTop:"2px solid #111",margin:"10px 0"}} />;
  const Row = ({l,v,bold})=>(
    <div style={{display:"flex",marginBottom:6,fontSize:12.5,fontFamily:"'Times New Roman',serif"}}>
      <span style={{width:155,fontWeight:600,flexShrink:0}}>{l}</span>
      <span style={{marginRight:6,fontWeight:700}}>:</span>
      <span style={{fontWeight:bold?"700":"400"}}>{v}</span>
    </div>
  );

  return (
    <div ref={previewRef} style={{
      width:"100%",maxWidth:560,margin:"0 auto",
      background:"#fff",border:"2px solid #111",
      padding:"28px 32px",
      fontFamily:"'Times New Roman',Times,serif",
      fontSize:13,color:"#111",
      boxSizing:"border-box",lineHeight:1.5
    }}>
      {/* Header */}
      <div style={{textAlign:"center",marginBottom:6}}>
        <img src={LOGO} alt="Logo" style={{height:72,objectFit:"contain",marginBottom:6}} />
        <div style={{fontSize:18,fontWeight:700,letterSpacing:3,textTransform:"uppercase"}}>Arjuna Badminton Club</div>
        <div style={{fontSize:11,color:"#333",marginTop:3}}>
          #74, Arjuna Sports Complex, Near Ram Medicals,<br/>Kodipalya, Kengeri, Bangalore – 560 060
        </div>
        <div style={{fontSize:11,color:"#333",marginTop:2}}>
          Phone: +91 85488 87121 &nbsp;|&nbsp; Email: reachus2abc@gmail.com
        </div>
        <div style={{fontSize:11,color:"#333"}}>GST: 29ASAPD075P2ZD</div>
      </div>

      <DHR/>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:2}}>
        <span><strong>Receipt No:</strong> {rno}</span>
        <span><strong>Date:</strong> {dStr}</span>
      </div>
      <DHR/>

      <Row l="Student Name" v={name} bold />
      <Row l="Phone Number" v={phone} />
      <Row l="Batch" v={batch} />
      <Row l="Type" v={type_} />
      <Row l="Payment Mode" v={mode} />
      <Row l="Amount Paid" v={"₹ "+amt} bold />
      <Row l="For Month" v={month+" "+year} />

      <HR/>
      <div style={{fontSize:12,fontStyle:"italic",color:"#333",marginBottom:2}}>
        <strong>Amount in Words:</strong> {words}
      </div>
      <DHR/>

      <div style={{textAlign:"center",fontSize:11,color:"#555",marginBottom:20}}>
        Thank you for your payment.<br/>
        <em></em>
      </div>

      <HR/>

      {/* Signature — new enhanced image, blend mode removes white bg */}
      <div style={{display:"flex",justifyContent:"flex-end"}}>
        <div style={{textAlign:"center"}}>
          <img src={SIGN} alt="Signature"
            style={{height:60,objectFit:"contain",mixBlendMode:"multiply",marginBottom:2,display:"block",margin:"0 auto 2px"}} />
          <div style={{fontSize:11,borderTop:"1px solid #444",paddingTop:3,letterSpacing:1}}>Authorized Signatory</div>
          <div style={{fontSize:10,color:"#555"}}>For Arjuna Badminton Club</div>
        </div>
      </div>
    </div>
  );
}
