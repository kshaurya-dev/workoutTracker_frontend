import { useState , useRef , useEffect} from "react";
import styles from './SearchField.module.css'

const SearchField=({onSelect , list ,placeHolder, field})=>{
  const wrapperRef = useRef(null);
  const [query , setQuery]=useState('')
  const [open , setOpen]=useState(false)

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const filtered = list.filter(item =>
    String(item[field]).toLowerCase().includes(query.toLowerCase()))

  const handleSelect =(item)=>{
    onSelect(item)
    setQuery(String(item[field]))
    setOpen(false)  
  }
    return (
    <div ref={wrapperRef} className={styles.dropdownWrapper}>
      <input
        className={styles.mediumInput}
        placeholder={placeHolder}
        value={query}
        onFocus={() => setOpen(true)}
        onChange={e => {
          setQuery(e.target.value)
          setOpen(true)}} />

      {open && (
        <div className={styles.dropdown}>
          {filtered.length === 0 && (
            <div className={styles.dropdownItemMuted}>
              No exercises found
            </div>
          )}

          {filtered.map((item , index) => (
            <div
              key={item.id || index}
              className={styles.dropdownItem}
              onClick={() =>handleSelect(item)}
            >
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchField