import React from 'react'
import { Descriptions} from 'antd'

function MovieInfo(props) {
    let {movie} = props;
    return (
        <Descriptions title="영화 정보" bordered>
            <Descriptions.Item label="제목">{movie.original_title}</Descriptions.Item>
            <Descriptions.Item label="출시일">{movie.release_date}</Descriptions.Item>
            <Descriptions.Item label="수익">${movie.revenue}</Descriptions.Item>
            <Descriptions.Item label="상영시간">{movie.runtime} 분</Descriptions.Item>
            <Descriptions.Item label="평균평점">
                ★{movie.vote_average}
            </Descriptions.Item>
            <Descriptions.Item label="리뷰수">{movie.vote_count} 개</Descriptions.Item>
            <Descriptions.Item label="상태">{movie.status==='Released'?"출시":"미개봉"}</Descriptions.Item>
            <Descriptions.Item label="인기">{movie.popularity}</Descriptions.Item>
        </Descriptions>
        
    )
}

export default MovieInfo
