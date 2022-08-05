package com.common.dipping.api.board.domain.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.common.dipping.api.user.domain.entity.User;

import com.common.dipping.common.Common;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Comment extends Common {

	private String content;

	@Column(nullable = true)
	private long parentId;
	
	@Builder
	public Comment(String content, Long parentId) {
		this.content = content;
		this.parentId = parentId;
	}
	
//	@ManyToMany(mappedBy = "comments", fetch = FetchType.LAZY)
//    private List<Like> Likes = new ArrayList<>();
	
	// 게시판 연결
	@ManyToOne
    @JoinColumn(name = "boardId")
    private Board board;

	// 댓글작성자번호 연결
	@ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
