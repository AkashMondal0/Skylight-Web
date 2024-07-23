
// import React from 'react';
// import { useWindowVirtualizer } from '@tanstack/react-virtual';
// import { getRandomPost } from '@/components/sky/random';

// function Example() {
//   const listRef = React.useRef<HTMLDivElement | null>(null);

//   const virtualizer = useWindowVirtualizer({
//     count: 200,
//     estimateSize: () => 35,
//     overscan: 5,
//     scrollMargin: listRef.current?.offsetTop ?? 0,
//   });

//   const data = getRandomPost(200)

//   return (
//     <>
//       <div ref={listRef} className="List">
//         <div
//           style={{
//             height: `${virtualizer.getTotalSize()}px`,
//             width: '100%',
//             position: 'relative',
//           }}
//         >
//           {virtualizer.getVirtualItems().map((item) => (
//             <div
//               key={item.key}
//               className={item.index % 2 ? 'ListItemOdd' : 'ListItemEven'}
//               style={{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 width: '100%',
//                 transform: `translateY(${
//                   item.start - virtualizer.options.scrollMargin
//                 }px)`,
//               }}
//             >
//               Row {data[item.index].content}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default function App() {
//   return (
//     <div>
//       <p>
//         In many cases, when implementing a virtualizer with a window as the
//         scrolling element, developers often find the need to specify a
//         "scrollMargin." The scroll margin is a crucial setting that defines the
//         space or gap between the start of the page and the edges of the list.
//       </p>
//       <br />
//       <br />
//       <h3>Window scroller</h3>
//       <Example />
//     </div>
//   );
// }
export default function page() {
  return <>test1</>
}