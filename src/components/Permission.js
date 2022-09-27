import React from 'react'

export default function Permission() {
  return (
    <div>
          <input type="text" id="email" name="email" placeholder='invite'></input>
          <select>
              <option>Read</option>
              <option>Write</option>
          </select>
          <button>Invite</button>
    </div>
  )
}
