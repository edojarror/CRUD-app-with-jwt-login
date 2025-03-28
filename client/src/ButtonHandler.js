
export const readHandler = (setstate) => {
    fetch("http://localhost:4000/").then(res => res.json()).then(data => setstate(data)).then(text => console.log("from button handler method")).catch(err => console.log(err))
}

export const deleteHandler = async (user_id, setdata) => {
  await fetch("http://localhost:4000/delete", 
  {
    method: "DELETE",
    body: JSON.stringify({user_id: user_id}), 
    headers: {
      "Content-Type": "application/json", }
  })
  .then(res => res.json())
  .then(data => setdata(data))
  .catch(err => console.log(err))}