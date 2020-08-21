import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import useKeyPress from '../hooks/useKeyPress'
// import { logRoles } from '@testing-library/react'
// import useIpcRenderer from '../hooks/useIpcRenderer'

const FileSearch = ({ title, onFileSearch }) => {
  const [inputActive, setInputActive] = useState(false)
  const [value, setValue] = useState('')
  const enterPressed = useKeyPress(13)
  const escPressed = useKeyPress(27)
  let node = useRef(null)

  const startSearch = () => {
    setInputActive(true)
  }

  const closeSearch = () => {
    setInputActive(false)
    setValue('')
    onFileSearch(false)
  }
  // useIpcRenderer({
  //   'search-file': startSearch
  // })

  // 持续监听按键事件
  useEffect(() => {
    // enter 回车按钮
    if (enterPressed && inputActive) {
      console.log('value', value)
      onFileSearch(value)
    }

    // esc退出按钮
    if (escPressed && inputActive) {
      closeSearch()
    }
  })

  // 激活input高亮状态
  useEffect(() => {
    if (inputActive) {
      node.current.focus()
    }
  }, [inputActive])

  return (
    <div className="alert alert-primary d-flex justify-content-between align-items-center mb-0">
      {!inputActive && (
        <>
          <span>{title}</span>
          <button type="button" className="icon-button" onClick={startSearch}>
            <FontAwesomeIcon title="搜索" size="lg" icon={faSearch} />
          </button>
        </>
      )}
      {inputActive && (
        <>
          <input
            className="form-control"
            style={{height:'26px'}}
            value={value}
            ref={node}
            onChange={(e) => {
              setValue(e.target.value)
            }}
          />
          <button type="button" className="icon-button" onClick={closeSearch}>
            <FontAwesomeIcon title="关闭" size="sm" icon={faTimes} />
          </button>
        </>
      )}
    </div>
  )
}

FileSearch.propTypes = {
  title: PropTypes.string,
  onFileSearch: PropTypes.func.isRequired
}

FileSearch.defaultProps = {
  title: '我的云文档'
}

export default FileSearch
