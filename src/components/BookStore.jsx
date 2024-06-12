import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
// import Data from './Demo/data.json'
import { useNavigate } from 'react-router-dom';

const BookStore = () => {
    const [newBook, setNewBook] = useState({
        "BookName": "", "Price": "", "SalePrice": "", "BookId": "", "Author": "", "EmailId": ""
    })
    const changeField = (e) => {
        setNewBook({ ...newBook, [e.target.name]: e.target.value })
    }

    let GlobalBook = JSON.parse(localStorage.getItem('BookData')) || []

    const navigate = useNavigate();
    const [search, setSearch] = useState('')
    const changeMe = (e) => {
        setSearch(e.target.value)
        console.log(search)
    }

    const validBook = (book) => {

        if (book.BookName === '' || book.BookName.length < 5) {
            console.log('BookName Not Valid')
            return false
        }
        else if (book.Price === '' || isNaN(book.Price) || book.Price < 0) {
            console.log('BookPrice Not Valid')
            return false
        }
        else if (book.SalePrice === '' || isNaN(book.SalePrice) || book.SalePrice > book.Price) {
            console.log('SalePrice Not Valid')
            return false
        }
        else if (book.Author === '' || book.Author.length < 5) {
            console.log('Author Not Valid')
            return false
        }
        else if (book.EmailId === '' || !/^(?!\.)[\w+]+(?:[.%_+][\w+]+)*@[\w+]+\.[A-Za-z]{2,}/g.test(book.EmailId)) {
            console.log('Email Not Valid')
            return false
        }
        console.log(GlobalBook)
        console.log("Herere", GlobalBook.find((oldBook) => oldBook.BookId === book.BookId))
        if (book.BookId === '' || GlobalBook.find((oldBook) => oldBook.BookId === book.BookId) !== undefined) {
            console.log('BookId Not Valid')
            return false
        }
        console.log("Okay")
        return true

        // return ? "valid" : 'notValid'
    }

    const handleSubmit = (e) => {
        console.log(newBook)
        console.log('!validBook(newBook)', !validBook(newBook))
        console.log(!validBook(newBook))
        if (!validBook(newBook)) {
            return alert("Book Not valid")
        }


        GlobalBook.push(newBook)
        localStorage.setItem("BookData", JSON.stringify(GlobalBook))
        setNewBook({
            "BookName": "", "Price": "", "SalePrice": "", "BookId": "", "Author": "", "EmailId": ""
        })
        console.log('Sucessful')
    }

    useEffect(() => {
        let currentUser = localStorage.getItem('currentUser')
        if (!currentUser) {
            // showAlert("Login Required", 'warning');
            navigate("/login");
        }
    }, [])

    const handleDelete = (BookId) => {
        console.log(BookId)
        GlobalBook= GlobalBook.filter((oldBook)=>oldBook.BookId !== BookId)
        localStorage.setItem("BookData", JSON.stringify(GlobalBook))
        alert
    }

    // useEffect(() => {
    //     localStorage.setItem("BookData", JSON.stringify(GlobalBook))
    // }, [GlobalBook])
    

    return (
        <>
            <div className="mainpage-contanier">
                <Navbar />

                <div className="serchpanel">
                    <input type="text" className='search-inp' name='search' value={search} placeholder='Search Here' onChange={changeMe} required />
                    {/* <!-- Button trigger modal --> */}
                    <button type="button" className="btn btn-primary AddBook" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Add Book
                    </button>

                    {/* <!-- Modal --> */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="newBook-container flex">
                                        <span>
                                            <label htmlFor="BookName">BookName</label>
                                            <input type="text" value={newBook.BookName} name='BookName' placeholder='BookName' onChange={changeField} />
                                        </span>
                                        <span>
                                            <label htmlFor="BookName">Price</label>
                                            <input type="text" value={newBook.Price} name='Price' placeholder='Price' onChange={changeField} />
                                        </span>
                                        <span>
                                            <label htmlFor="BookName">SalePrice</label>
                                            <input type="text" value={newBook.SalePrice} name='SalePrice' placeholder='SalePrice' onChange={changeField} />
                                        </span>
                                        <span>
                                            <label htmlFor="BookName">BookId</label>
                                            <input type="text" value={newBook.BookId} name='BookId' placeholder='BookId' onChange={changeField} />
                                        </span>
                                        <span>
                                            <label htmlFor="BookName">Author</label>
                                            <input type="text" value={newBook.Author} name='Author' placeholder='Author' onChange={changeField} />
                                        </span>
                                        <span>
                                            <label htmlFor="BookName">EmailId</label>
                                            <input type="text" value={newBook.EmailId} name='EmailId' placeholder='EmailId' onChange={changeField} />
                                        </span>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="Book-table">
                    <table className='table'>
                        <thead className='table-header'>
                            <tr>
                                <th>SR NO.</th>
                                <th>Book Name</th>
                                <th>Price</th>
                                <th>Sale Price</th>
                                <th>Book Id</th>
                                <th>Author</th>
                                <th>Email Id</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody className='table-body'>
                            {
                                GlobalBook.length === 0 ? <tr></tr> :
                                    GlobalBook.filter((Book) => {
                                        return search.toLowerCase() === '' ? Book : Book.BookName.toLowerCase().includes(search)
                                    }).map((Book, index) => {
                                        return (
                                            <tr key={Book.BookId}>
                                                <td>{index + 1}</td>
                                                <td>{Book.BookName}</td>
                                                <td>{Book.Price}</td>
                                                <td>{Book.SalePrice}</td>
                                                <td>{Book.BookId}</td>
                                                <td>{Book.Author}</td>
                                                <td>{Book.EmailId}</td>
                                                <td>{<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg>}</td>
                                                <td onClick={()=>handleDelete(Book.BookId)}>{<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                                </svg>}</td>
                                            </tr>
                                        )
                                    })}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default BookStore