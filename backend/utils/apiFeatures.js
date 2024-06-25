class ApiFeatures{
  constructor(query, queryStr){
    this.query = query;
    this.queryStr = queryStr
  }

  search(){
    if (this.queryStr.keyword) {
      const keyword = {
        name: {
          $regex: this.queryStr.keyword,
          $options: 'i' // case-insensitive
        }
      };
      this.query = this.query.find(keyword);
    }
    return this;
  }
  filter(){
    const queryCopy = {...this.queryStr};
    //remove filed

    const removeFileds = ["keyword","page","limit"];
    removeFileds.forEach((key) => delete queryCopy[key]);
    

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    const parsedQuery = JSON.parse(queryStr);
    this.query = this.query.find(parsedQuery);
    return this;
  }

  pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage-1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this; 
  }
}

module.exports = ApiFeatures