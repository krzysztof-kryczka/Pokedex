import React from 'react'
import { Button } from '../shared/UI/Button'

const PaginationButton = ({ page, label, currentPage, onPageChange }) => (
   <button
      onClick={() => onPageChange(page)}
      className={`w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 flex items-center justify-center text-sm sm:text-base md:text-3xl font-bold rounded-full ${
         currentPage === page
            ? 'text-white border-2 border-blue-500 bg-gray-300'
            : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white hover:rounded-full'
      }`}
   >
      {label || page}
   </button>
)

export const Pagination = ({ currentPage, totalPages, onPageChange, pageType }) => {
   if (totalPages < 1) return null

   const maxPages = 5
   const startPage = Math.max(1, Math.min(totalPages - maxPages + 1, currentPage - Math.floor(maxPages / 2)))
   const endPage = Math.min(totalPages, startPage + maxPages - 1)
   const pages = [...Array(Math.max(endPage - startPage + 1, 0)).keys()].map(i => startPage + i)

   console.log('pageType', pageType)

   return (
      <div className="flex flex-wrap justify-center space-x-2 my-4">
         {pageType !== 'edit' && pageType !== 'ranking' && pageType !== 'favorites' && currentPage > 1 && (
            <PaginationButton
               page={currentPage - 1}
               label="&lt;"
               currentPage={currentPage}
               onPageChange={onPageChange}
            />
         )}
         {pageType !== 'edit' && pageType !== 'ranking' && pageType !== 'favorites' && (
            <PaginationButton page={1} currentPage={currentPage} onPageChange={onPageChange} />
         )}
         {pageType !== 'edit' &&
            pageType !== 'ranking' &&
            pageType !== 'favorites' &&
            startPage > 1 &&
            startPage !== 2 && (
               <button
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 flex items-center justify-center text-sm sm:text-base md:text-3xl font-bold bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full"
                  disabled
               >
                  ...
               </button>
            )}
         {pageType !== 'edit' &&
            pageType !== 'ranking' &&
            pageType !== 'favorites' &&
            pages.map(
               page =>
                  page !== 1 && (
                     <PaginationButton key={page} page={page} currentPage={currentPage} onPageChange={onPageChange} />
                  ),
            )}
         {pageType !== 'edit' && pageType !== 'ranking' && pageType !== 'favorites' && endPage < totalPages && (
            <>
               <button
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 flex items-center justify-center text-sm sm:text-base md:text-3xl font-bold bg-white text-blue-500 hover:bg-blue-500 hover:text-white rounded-full"
                  disabled
               >
                  ...
               </button>
               <PaginationButton page={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
            </>
         )}
         {pageType !== 'edit' && pageType !== 'ranking' && pageType !== 'favorites' && currentPage < totalPages && (
            <PaginationButton
               page={currentPage + 1}
               label="&gt;"
               currentPage={currentPage}
               onPageChange={onPageChange}
            />
         )}

         {(pageType === 'edit' || pageType === 'ranking' || pageType === 'favorites') && (
            <>
               <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                  Poprzednia
               </Button>

               <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  Następna
               </Button>
            </>
         )}
      </div>
   )
}
