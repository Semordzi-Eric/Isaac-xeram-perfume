const e=r=>new Intl.NumberFormat("en-GH",{style:"currency",currency:"GHS",minimumFractionDigits:2,currencyDisplay:"narrowSymbol"}).format(r).replace(/^(\D+)/,"$1 ").replace(/\s+/," ");export{e as f};
