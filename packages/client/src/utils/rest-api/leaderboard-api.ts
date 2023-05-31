import { FetchMethods, request } from './base-request'
import {
  BASE_SERVER_URL,
  USER_API_URL,
  LEADERBOARD_API_URL,
  TEAM_NAME,
  LeaderboardApiPaths,
  BASE_YA_URL,
} from '../const-variables/api'
import {
  UserItem,
  LeaderboardItem,
  LeaderboardRequest,
  addUserToLeaderboardRequest,
} from '../types/leaderboard'
import { useAppSelector } from '../../hooks/useStore'
import { selectCurrentUserId } from '../../store/selectors/user-selector'

export async function updateScore( score: number ): Promise<void> {
  const id = useAppSelector(selectCurrentUserId)

  return await request(BASE_SERVER_URL, `${USER_API_URL}/${id}`, {
    method: FetchMethods.PATCH,
    data: { role: 1, score: score },
  })
}

export async function getLeaderboard(): Promise<UserItem[]> {
  return await request<UserItem[]>(BASE_SERVER_URL, `${USER_API_URL}/all`, {
    method: FetchMethods.GET,
  })

  /*let result : LeaderboardItem[] = []

  console.log(users)

  result.push(
    {
      data: {
        id: 43,
        login: 'logIN',
        avatar: null,
        score: 41
      }
    }
  )*/

  /*for(user in users) {
    let item = new LeaderboardItem()

    result.push(item)
  }*/

  //console.log(result)

  //return result

  /*return users.map(user => {
    let item = new LeaderboardItem()

    item.data.id = user.id
    item.data.login = user.id
    item.data.avatar = null
    item.score = user.score

    return item
  })*/
}


export async function getAllLeaderboards(
  data: LeaderboardRequest
): Promise<LeaderboardItem[]> {
  return await request<LeaderboardItem[]>(
    BASE_YA_URL,
    `${LEADERBOARD_API_URL}${LeaderboardApiPaths.GET_ALL_LEADERBOARDS}`,
    {
      method: FetchMethods.POST,
      data,
    }
  )
}

export async function getLeaderboardByTeamName(
  data: LeaderboardRequest,
  teamName: string = TEAM_NAME
): Promise<LeaderboardItem[]> {
  return await request<LeaderboardItem[]>(
    BASE_YA_URL,
    `${LEADERBOARD_API_URL}/${teamName}`,
    {
      method: FetchMethods.POST,
      data,
    }
  )
}

export async function addUserToLeaderboard(
  data: addUserToLeaderboardRequest
): Promise<void> {
  return await request(BASE_YA_URL, `${LEADERBOARD_API_URL}`, {
    method: FetchMethods.POST,
    data,
  })
}
