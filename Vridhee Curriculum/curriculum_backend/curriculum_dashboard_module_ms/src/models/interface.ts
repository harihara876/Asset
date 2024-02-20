export interface ISubChapTopicQuery {
    "subjectName": string,
    "chapter": [
        {
            "chapterName": string,
            "unit": string,
            "marks": string,
            "period": string,
            "e_book": Array<string>
            "topics": Array<string>
        }
    ]
}

// export interface ISubInsertQuery {
//     subjectName: string
// }