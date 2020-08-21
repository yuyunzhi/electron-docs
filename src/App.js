import React, { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FileSearch from './components/FileSearch'
import FileList from './components/FileList'
import uuidv4 from 'uuid/v4'
import { faPlus, faFileImport } from '@fortawesome/free-solid-svg-icons'
import { flattenArr, objToArr, timestampToString } from './utils/helper'
import defaultFiles from './utils/defaultFiles'
import BottomBtn from './components/BottomBtn'

const Store = window.require('electron-store')
const fileStore = new Store({ name: 'Files Data' })

function App() {
  const [files, setFiles] = useState(fileStore.get('files') || {})
  const [searchedFiles, setSearchedFiles] = useState([])
  const filesArr = objToArr(files)
  const fileListArr = searchedFiles.length > 0 ? searchedFiles : filesArr

  const fileClick = (fileID) => {
    // set current active file
    // setActiveFileID(fileID)
    // const currentFile = files[fileID]
    // const { id, title, path, isLoaded } = currentFile
    // if (!isLoaded) {
    //   if (getAutoSync()) {
    //     ipcRenderer.send('download-file', { key: `${title}.md`, path, id })
    //   } else {
    //     fileHelper.readFile(currentFile.path).then(value => {
    //       const newFile = { ...files[fileID], body: value, isLoaded: true }
    //       setFiles({ ...files, [fileID]: newFile })
    //     })
    //   }
    // }
    // // if openedFiles don't have the current ID
    // // then add new fileID to openedFiles
    // if (!openedFileIDs.includes(fileID)) {
    //   setOpenedFileIDs([ ...openedFileIDs, fileID ])
    // }
  }

  const fileSearch = (keyword) => {
    // filter out the new files based on the keyword
    // const newFiles = filesArr.filter(file => file.title.includes(keyword))
    // setSearchedFiles(newFiles)
  }
  const deleteFile = (id) => {
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
  }

  const updateFileName = (id, title, isNew) => {
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
  }

  const createNewFile = () => {
    const newID = uuidv4()
    console.log('newID', newID)

    const newFile = {
      id: newID,
      title: '',
      body: '## 请输出 Markdown',
      createdAt: new Date().getTime(),
      isNew: true
    }
    setFiles({ ...files, [newID]: newFile })
  }

  const importFiles = () => {
    // remote.dialog.showOpenDialog({
    //   title: '选择导入的 Markdown 文件',
    //   properties: ['openFile', 'multiSelections'],
    //   filters: [
    //     {name: 'Markdown files', extensions: ['md']}
    //   ]
    // }, (paths) => {
    //   if (Array.isArray(paths)) {
    //     // filter out the path we already have in electron store
    //     // ["/Users/liusha/Desktop/name1.md", "/Users/liusha/Desktop/name2.md"]
    //     const filteredPaths = paths.filter(path => {
    //       const alreadyAdded = Object.values(files).find(file => {
    //         return file.path === path
    //       })
    //       return !alreadyAdded
    //     })
    //     // extend the path array to an array contains files info
    //     // [{id: '1', path: '', title: ''}, {}]
    //     const importFilesArr = filteredPaths.map(path => {
    //       return {
    //         id: uuidv4(),
    //         title: basename(path, extname(path)),
    //         path,
    //       }
    //     })
    //     // get the new files object in flattenArr
    //     const newFiles = { ...files, ...flattenArr(importFilesArr)}
    //     // setState and update electron store
    //     setFiles(newFiles)
    //     saveFilesToStore(newFiles)
    //     if (importFilesArr.length > 0) {
    //       remote.dialog.showMessageBox({
    //         type: 'info',
    //         title: `成功导入了${importFilesArr.length}个文件`,
    //         message: `成功导入了${importFilesArr.length}个文件`,
    //       })
    //     }
    //   }
    // })
  }

  return (
    <div className="App container-fluid px-0">
      {/* { isLoading && 
      <Loader />
    } */}
      <div className="row no-gutters">
        <div className="col-3 bg-light left-panel">
          <FileSearch title="My Document" onFileSearch={fileSearch} />
          <FileList
            files={defaultFiles}
            onFileClick={fileClick}
            onFileDelete={deleteFile}
            onSaveEdit={updateFileName}
          />
          <div className="row no-gutters button-group">
            <div className="col">
              <BottomBtn
                text="新建"
                colorClass="btn-primary"
                icon={faPlus}
                onBtnClick={createNewFile}
              />
            </div>
            <div className="col">
              <BottomBtn
                text="导入"
                colorClass="btn-success"
                icon={faFileImport}
                onBtnClick={importFiles}
              />
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
