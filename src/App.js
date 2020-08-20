import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch'
// import { flattenArr, objToArr, timestampToString } from './utils/helper'

const Store = window.require('electron-store')
// const fileStore = new Store({'name': 'Files Data'})

function App() {
  // const [ files, setFiles ] = useState(fileStore.get('files') || {})
  // const [ searchedFiles, setSearchedFiles ] = useState([])
  // const filesArr = objToArr(files)
  // const fileListArr = (searchedFiles.length > 0) ? searchedFiles : filesArr

  const fileSearch = (keyword) => {
    // filter out the new files based on the keyword
    // const newFiles = filesArr.filter(file => file.title.includes(keyword))
    // setSearchedFiles(newFiles)
  }
  // const deleteFile = (id) => {
  // if (files[id].isNew) {
  //   const { [id]: value, ...afterDelete } = files
  //   setFiles(afterDelete)
  // } else {
  //   fileHelper.deleteFile(files[id].path).then(() => {
  //     const { [id]: value, ...afterDelete } = files
  //     setFiles(afterDelete)
  //     saveFilesToStore(afterDelete)
  //     // close the tab if opened
  //     tabClose(id)
  //   })
  // }
  // }
  // const updateFileName = (id, title, isNew) => {
  // newPath should be different based on isNew
  // if isNew is false, path should be old dirname + new title
  // const newPath = isNew ? join(savedLocation, `${title}.md`)
  // : join(dirname(files[id].path), `${title}.md`)
  // const modifiedFile = { ...files[id], title, isNew: false, path: newPath }
  // const newFiles = { ...files, [id]: modifiedFile }
  // if (isNew) {
  //   fileHelper.writeFile(newPath, files[id].body).then(() => {
  //     setFiles(newFiles)
  //     saveFilesToStore(newFiles)
  //   })
  // } else {
  //   const oldPath = files[id].path
  //   fileHelper.renameFile(oldPath, newPath).then(() => {
  //     setFiles(newFiles)
  //     saveFilesToStore(newFiles)
  //   })
  // }

  // }

  return (
    <div className="App container-fluid px-0">
      {/* { isLoading && 
      <Loader />
    } */}
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch title="My Document" onFileSearch={fileSearch} />
          {/* <FileList 
          files={fileListArr}
          onFileClick={fileClick}
          onFileDelete={deleteFile}
          onSaveEdit={updateFileName}
        /> */}
          <div className="row no-gutters button-group">
            <div className="col">
              {/* <BottomBtn 
              text="新建"
              colorClass="btn-primary"
              icon={faPlus}
              onBtnClick={createNewFile}
            /> */}
            </div>
            <div className="col">
              {/* <BottomBtn 
              text="导入"
              colorClass="btn-success"
              icon={faFileImport}
              onBtnClick={importFiles}
            /> */}
            </div>
          </div>
        </div>
        <div className="col-9 right-panel">
          {/* { !activeFile && 
          <div className="start-page">
            选择或者创建新的 Markdown 文档
          </div>
        }
        { activeFile &&
          <>
            <TabList
              files={openedFiles}
              activeId={activeFileID}
              unsaveIds={unsavedFileIDs}
              onTabClick={tabClick}
              onCloseTab={tabClose}
            />
            <SimpleMDE
              key={activeFile && activeFile.id} 
              value={activeFile && activeFile.body}
              onChange={(value) => {fileChange(activeFile.id, value)}}
              options={{
                minHeight: '515px',
              }}
            />
            { activeFile.isSynced && 
              <span className="sync-status">已同步，上次同步{timestampToString(activeFile.updatedAt)}</span>
            }
          </>
        } */}
        </div>
      </div>
    </div>
  )
}

export default App
