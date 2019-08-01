import React from 'react';

const Entry = ({ entry }) => {
  // Turn all singular objects into arrays of one element
  if (!Array.isArray(entry.k_ele)) {
    entry.k_ele = [entry.k_ele];
  }
  if (!Array.isArray(entry.r_ele)) {
    entry.r_ele = [entry.r_ele];
  }
  if (!Array.isArray(entry.sense)) {
    entry.sense = [entry.sense];
  }
  for (let i = 0; i < entry.sense.length; i++) {
    entry.sense[i]._id = i; // Mapping keys for react
    if (!Array.isArray(entry.sense[i].gloss)) {
      entry.sense[i].gloss = [entry.sense[i].gloss];
    }
  }

  console.log('Entry', entry);

  return (
    <div style={{display: 'inline'}}>
      <p>{entry._id}</p>
      <p>Kanji: 
        {
          entry.k_ele.map((k) => ` ${k.keb}`)
        }
      </p>
      <p>Reading: 
        {
          entry.r_ele.map((r) => ` ${r.reb}`)
        }
      </p>
      <div>
        <span>Sense:</span>
        <ol>
          {
            entry.sense.map((s) => 
              <li key={s._id}>
                {
                  s.gloss.map((g) => ` ${g._t}`)
                }
              </li>
            )
          }
        </ol>
      </div>
    </div>
  );
}

export default Entry;
