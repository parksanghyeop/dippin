package com.common.dipping.domain.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.common.dipping.user.domain.User;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class UserTag {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long userTagSeq;

	@OneToOne
    @JoinColumn(name = "userSeq")
    private User user;
	
	@ManyToOne
    @JoinColumn(name = "boardSeq")
    private Board board;

	@Builder
	public UserTag( User user, Board board) {
		this.user = user;
		this.board = board;
	}
	
	
}