import Break from './Break'
import Category from './Category'

const Categories = ({catData}) => {

  const sortBycategory = catData.reduce((acc, cat) => {
    if (!acc[cat.type]) {
      acc[cat.type] = {
        cats : []
      }
    }
  
    acc[cat.type].cats.push(cat);
    return acc;
  }, {});
  const sortBycategoryArray = Object.entries(sortBycategory).map(([category, cats]) => ({ category, cats }));

  return (
    <>
      <div className="cat_cont">
        {
          sortBycategoryArray.reverse().map((i) => {
            return <>
            <Break title={i.category} />
            {i.cats.cats.map((j) => {
              return <Category page="cat" data={j} />
            })}
            </>
          })
        }
      </div>
    </>
  )
}

export default Categories