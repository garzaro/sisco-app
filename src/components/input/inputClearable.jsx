
export function InputClearable({
  value,
  fieldName,
  setValue,
  ariaLabel = 'Limpar campo',
  className = '',
  }) {
  const hasValue = value && value.length > 0

  function handleClear() {
    setValue(fieldName, '' )
  }

  return (
    <div className="input-wrapper">
      {hasValue && (
        <button
          type="button"
          // className="clear-button"
          onClick={handleClear}
          aria-label={ariaLabel}
          className={
            `absolute rounded-full h-6 w-6 bg-zinc-800 right-2 top-1/2 -translate-y-1/2 -mt-6
            text-zinc-200 hover:text-red-500 hover:bg-red-500/10 ${className}`}
        >
          ×
        </button>
      )}
    </div>
  )
}

export function InputClearablePassword({
  value,
  fieldName,
  setValue,
  ariaLabel = 'Limpar campo',
  className = '',
  }) {
  const hasValue = value && value.length > 0

  function handleClear() {
    setValue(fieldName, '' )
  }

  return (
    <div className="input-wrapper">
      {hasValue && (
        <button
          type="button"
          // className="clear-button"
          onClick={handleClear}
          aria-label={ariaLabel}
          className={
            `absolute rounded-full h-6 w-6 bg-zinc-800 right-4 top-1/2 -translate-y-1/2 -mt-6
            text-zinc-200 hover:text-red-500 hover:bg-red-500/10 ${className}`}
        >
          ×
        </button>
      )}
    </div>
  )
}




