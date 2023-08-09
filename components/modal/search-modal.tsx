"use client"

import React from "react"

import useSearchModal from "@/hooks/use-search-modal"

import Search from "../search/search"
import Modal from "./modal"

const SearchModal = () => {
  const useSearch = useSearchModal()

  const toggle = () => {
    if (useSearch.isOpen) {
      useSearch.close()
    } else {
      useSearch.open()
    }
  }

  return (
    <Modal
      name="Search"
      isOpen={useSearch.isOpen}
      toggle={toggle}
      className="sm:max-w-4xl"
    >
      <Search modal={useSearch} />
    </Modal>
  )
}

export default SearchModal
