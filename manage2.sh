#!/usr/bin/env bash

function usage () {
	echo "./manage [ (migrate | mg) <name> ][ (watch | w) ]"
}

function migrate () {
	if [ -z "$1" ]
		then
			echo "Please specify migration name"
			exit 1
	else
		local cmd="ef migrations add $1 -s API -p Persistence"
		echo "$cmd"
		dotnet "$cmd"
	fi
}

function watch () {
	cd API && dotnet run --watch
}

function main () {
	case $1 in
		migrate | mg)
			migrate "$2"
		;;

		watch | w)
			watch
		;;

		*)
			usage
		;;
	esac

	exit 0
}

main "$@"
